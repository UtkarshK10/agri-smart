import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { states, STATE_TO_CODE } from "../../data";
import { listLandDetails, updateLand } from "../../actions/landActions";
import { LAND_UPDATE_RESET } from "../../constants/landConstants";

const LandEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const landId = params.id;

  const [area, setArea] = useState(0);
  const [stateName, setStateName] = useState("Sample state");
  const [districtName, setDistrictName] = useState("Sample district");
  const [seasonName, setSeasonName] = useState("Sample season");
  const [cropName, setCropName] = useState("Sample crop");
  const [minBidAmt, setMinBidAmt] = useState(0);
  const [estProd, setEstProd] = useState(0);
  // const [capitalReturn, setCapitalReturn] = useState("");

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const landDetails = useSelector((state) => state.landDetails);
  const { loading, error, land } = landDetails;

  const landUpdate = useSelector((state) => state.landUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = landUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LAND_UPDATE_RESET });
      navigate("/contract");
    } else {
      if (!land || land._id !== landId) {
        dispatch(listLandDetails(landId));
      } else {
        console.log(land);
        setArea(land.area);
        setStateName(land.state);
        setDistrictName(land.district);
        setSeasonName(land.season);
        setCropName(land.crop);
        setImage(land.image);
        setEstProd(land.estProd);
        setMinBidAmt(land.minBidAmt);
        // setCapitalReturn(land.capitalReturn);
      }
    }
  }, [dispatch, navigate, landId, land, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(estProd);
    dispatch(
      updateLand({
        _id: landId,
        area,
        state: stateName,
        district: districtName,
        season: seasonName,
        crop: cropName,
        image,
        minBidAmt,
        estProd,
        // capitalReturn,
      })
    );
  };

  const handleEstimatedProduction = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        state: STATE_TO_CODE[stateName],
        area,
        dist: `District_Name_${districtName}`,
        season: `Season_${seasonName}`,
        crop: `Crop_${cropName}`,
      },
      {
        headers: {
          authKey: "143authKey143",
        },
      }
    );

    setEstProd(data.toFixed(2));
  };

  const cropRenderHelp = () =>
    stateName !== "Sample state" && seasonName !== "Sample season";

  return (
    <>
      <Link to="/contract" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="area">
              <Form.Label>Area (in acres)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter area in acres"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <br></br>
            <div className="form__dropdown">
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>{" "}
                <Form.Select
                  aria-label="state"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="district">
                <Form.Label>District</Form.Label>{" "}
                <Form.Select
                  aria-label="district"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                >
                  {states
                    .find((s) => s.name === stateName)
                    .districts.map((district, index) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>

            <br></br>
            <br></br>
            <div className="form__dropdown">
              <Form.Group controlId="season">
                <div className="form__dropdown--label">
                  <Form.Label>Season</Form.Label>{" "}
                  <Form.Select
                    aria-label="season"
                    value={seasonName}
                    onChange={(e) => {
                      console.log(e.target.value, seasonName);
                      setSeasonName(e.target.value);
                    }}
                  >
                    {states
                      .find((s) => s.name === stateName)
                      .seasons.map((season, index) => (
                        <option key={season.name} value={season.name}>
                          {season.name}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </Form.Group>

              {cropRenderHelp() && (
                <Form.Group controlId="crop">
                  <div className="form__dropdown--label">
                    <Form.Label>Crop</Form.Label>{" "}
                    <Form.Select
                      aria-label="crop"
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                    >
                      {console.log(stateName, seasonName)}
                      {states
                        .find((s) => s.name === stateName)
                        .seasons.find((se) => se.name === seasonName)
                        .crops.map((crop, index) => (
                          <option key={index} value={crop}>
                            {crop}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              )}
            </div>
            <br></br>
            <br></br>
            <Button variant="primary" onClick={handleEstimatedProduction}>
              Estimate Production
            </Button>
            <br></br>
            <br></br>
            <Form.Group controlId="estProd">
              <Form.Label>Estimated Production (Q)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Estimated Prod"
                value={estProd}
                onChange={(e) => setEstProd(e.target.value)}
                readOnly
              ></Form.Control>
            </Form.Group>

            <br></br>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="image-file" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={uploadFileHandler}
                  placeholder="Choose File"
                />
              </Form.Group>
              {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File> */}
              {uploading && <Loader />}
            </Form.Group>
            <br></br>

            <Form.Group controlId="minBidAmt">
              <Form.Label>Min Bidding Amount (&#8377;)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter min bidding Amount"
                value={minBidAmt}
                onChange={(e) => setMinBidAmt(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <br></br>
            <Form.Group controlId="capitalReturn">
              <Form.Label>Capital Return %</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Capital Return"
                value={capitalReturn}
                onChange={(e) => setCapitalReturn(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
            <br></br>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default LandEditScreen;
