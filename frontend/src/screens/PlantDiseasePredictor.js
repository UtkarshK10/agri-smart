import React, { useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import Loader from "../components/Loader";

const PlantDiseasePredictor = () => {
  const [plantImage, setPlantImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState(null);

  const handleFileChange = (files) => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      setPlantImage(files[0]);
      setLoading(true);
      makePrediction(formData);
    }
  };

  const makePrediction = async (formData) => {
    const { data } = await axios.post("http://localhost:4000", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    setDisease(data);
  };

  const renderImage = () => {
    const image = URL.createObjectURL(plantImage);
    return <img src={image} alt='plant' />;
  };

  const isHealthyPlant = (title) => {
    return title.toLowerCase().includes("healthy");
  };

  const renderDiseasePrediction = () => {
    const { title, description, prevent } = disease;
    isHealthyPlant(title);
    return (
      <div className='disease-predictor'>
        <div>
          <h3>{title}</h3>
          {plantImage ? renderImage() : null}
        </div>
        <p>{description}</p>
        {!isHealthyPlant(title) ? (
          <>
            <h4>Prevention</h4>
            <p>{prevent}</p>
          </>
        ) : null}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs lg={{ offset: 0, span: 12 }}>
            {/* <Image
              src='/images/wip.jpg'
              className='work-in-progress'
              fluid={true}
            /> */}

            <DropzoneArea
              onChange={handleFileChange}
              acceptedFiles={["image/*"]}
              filesLimit={1}
            />
            {disease ? renderDiseasePrediction() : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlantDiseasePredictor;
