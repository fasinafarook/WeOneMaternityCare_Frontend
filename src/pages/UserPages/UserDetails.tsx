import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Footer from "../../components/common_pages/Footer";
import UserNavbar from "../../components/common_pages/UserHeader";
import toast from "react-hot-toast";
import { verfiyUserDetails } from "../../api/userAPI";

// Updated IFormInput interface
interface IFormInput {
  userAddress: string; // Changed to required
  profilePicture: []; // Changed to FileList for file input
  bp: string; // Changed to required
  sugar: string; // Changed to required
  weight: number; // Changed to required
  age: number; // Changed to required
  blood: string; // Changed to required
  additionalNotes: string; // Changed to required
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await verfiyUserDetails(data);
      console.log("regRespo:", response);

      if (response) {
        toast.success("Details updated");
        navigate("/user/home");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserNavbar />
      <div
        style={{
          minHeight: "100vh",
          background:
            "url(https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: "8px 28px",
        }}
      >
        <div className="register-page-container">
          <div className="register-page-overlay" />
          <div
            className="register-form-container"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for form
              borderRadius: "10px", // Rounded corners
              padding: "20px", // Padding for inner spacing
              maxWidth: "800px", // Maximum width of the form
              margin: "0 auto", // Center the form
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)", // Shadow effect
            }}
          >
            <h1
              className="register-title text-light"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
               <span className="text-primary">Details</span>
                <h4>"Please provide your medical details before booking."</h4>
            </h1>

            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row>
                {/* User Address */}
                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomAddress"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">User Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      autoComplete="off"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }} // Border styling
                      {...register("userAddress", {
                        required: "User address is required",
                      })}
                      isInvalid={!!errors.userAddress}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userAddress?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Profile Picture */}
                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomProfilePic"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-light">
                      Profile Photo
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register("profilePicture", {
                        required: "Profile picture is required",
                      })}
                      isInvalid={!!errors.profilePicture}
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.profilePicture?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Additional fields */}
                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomBp"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">
                      Blood Pressure
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your blood pressure"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                      {...register("bp", {
                        required: "Blood pressure is required",
                        min: {
                            value: 1,
                            message: "Bp must be a positive number",
                          },
                      })}
                      isInvalid={!!errors.bp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bp?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomSugar"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">Sugar Level</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your sugar level"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                      {...register("sugar", {
                        required: "Sugar level is required",
                        min: {
                            value: 1,
                            message: "Sugar must be a positive number",
                          },
                      })}
                      isInvalid={!!errors.sugar}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sugar?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomWeight"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">Weight</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your weight"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                      {...register("weight", {
                        required: "Weight is required",
                        min: {
                          value: 1,
                          message: "Weight must be a positive number",
                        },
                      })}
                      isInvalid={!!errors.weight}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.weight?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomAge"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your age"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                      {...register("age", {
                        required: "Age is required",
                        min: {
                          value: 1,
                          message: "Age must be a positive number",
                        },
                      })}
                      isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group
                    controlId="validationCustomBloodType"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">Blood Group</Form.Label>
                    <Form.Control
                      as="select"
                      className="bg-dark text-white" // Dropdown styling
                      {...register("blood", {
                        required: "Blood group is required",
                      })}
                      isInvalid={!!errors.blood}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.blood?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group
                    controlId="validationCustomNotes"
                    className="register-form-input w-100"
                  >
                    <Form.Label className="text-white">
                      Additional Medical Notes
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter any additional notes"
                      className="bg-dark text-white"
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                      }}
                      {...register("additionalNotes", {
                        required: "Additional notes are required",
                      })}
                      isInvalid={!!errors.additionalNotes}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.additionalNotes?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  style={{ borderRadius: "5px" }}
                >
                  Upload
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;
