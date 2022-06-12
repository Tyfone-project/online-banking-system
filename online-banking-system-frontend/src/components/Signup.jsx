import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png")
  const [showKycForm, setShowKycForm] = useState(false);
  let navigate = useNavigate();

  const userDetails = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, "Cannot exceed 20 characters")
        .required("First Name is required"),
      lastName: Yup.string()
        .max(20, "Cannot exceed 20 characters")
        .required("First Name is required"),
      email: Yup.string()
        .email("Please enter valid email")
        .required("Email is required"),
      dob: Yup.date()
        .max(
          new Date(Date.now() - 31556952000 * 18),
          "Minimum age should be 18 years"
        )
        .required("DOB is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "mobile number must be of 10 digits only")
        .required("mobile number is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Password is required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Passwords must match"),
    }),
    onSubmit: (values) => {
      setShowKycForm(true);
    },
  });

  const kycDetails = useFormik({
    initialValues: {
      aadharNo: "",
      panNo: "",
      address: "",
    },
    validationSchema: Yup.object({
      aadharNo: Yup.string()
        .matches(/^\d{12}$/, "Aadhar number must be of 12 digits")
        .required("Aadhar number is required"),
      panNo: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter valid Pan Number")
        .required("Pan number is required"),
      address: Yup.string()
        .max(100, "Cannot exceed 100 characters")
        .required("Address is required"),
    }),
    onSubmit: () => {
      const obj = {
        firstName: userDetails.values.firstName,
        lastName: userDetails.values.lastName,
        email: userDetails.values.email,
        dob: userDetails.values.dob,
        phone: userDetails.values.phone,
        password: userDetails.values.password,
        aadharNo: kycDetails.values.aadharNo,
        panNo: kycDetails.values.panNo,
        address: kycDetails.values.address,
        roles: "ROLE_CUSTOMER",
      }
      const json = JSON.stringify(obj);
      const blob = new Blob([json], {
        type: "application/json"
      })
      const formData = new FormData();
      formData.append("request", blob);
      formData.append("image", image);
      axios
        .post("http://localhost:8080/api/signup", formData)
        .then((res) => {
          console.log(res);
          toast.success("SignUp Successful");
          navigate("/login");
        }).catch(toast.error("SignUp Unsuccessful"));
    },
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setPreview(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      {!showKycForm ? (
        // USER DETAILS SECTION
        <section>
          <h1 className="fw-bolder">Create a new account</h1>
          <span className="text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Log in here
            </Link>
          </span>
          <hr />
          <Form onSubmit={userDetails.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control

                name="firstName"
                type="text"
                placeholder="Enter First Name"
                value={userDetails.values.firstName}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.firstName && userDetails.errors.firstName && (
                <span className="text-danger">
                  <small>{userDetails.errors.firstName}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={userDetails.values.lastName}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.lastName && userDetails.errors.lastName && (
                <span className="text-danger">
                  <small>{userDetails.errors.lastName}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter Email Address"
                value={userDetails.values.email}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.email && userDetails.errors.email && (
                <span className="text-danger">
                  <small>{userDetails.errors.email}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="dob"
                type="date"
                placeholder="Enter Date of birth"
                value={userDetails.values.dob}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.dob && userDetails.errors.dob && (
                <span className="text-danger">
                  <small>{userDetails.errors.dob}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="phone"
                type="text"
                placeholder="Enter mobile number"
                value={userDetails.values.phone}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.phone && userDetails.errors.phone && (
                <span className="text-danger">
                  <small>{userDetails.errors.phone}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter Password"
                value={userDetails.values.password}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.password && userDetails.errors.password && (
                <span className="text-danger">
                  <small>{userDetails.errors.password}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
                value={userDetails.values.cpassword}
                onChange={userDetails.handleChange}
                onBlur={userDetails.handleBlur}
              />
              {userDetails.touched.cpassword && userDetails.errors.cpassword && (
                <span className="text-danger">
                  <small>{userDetails.errors.cpassword}</small>
                </span>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 m-0">
              Continue
            </Button>
          </Form>
        </section>
      ) : (
        // KYC DETAILS SECTION
        <section>
          <h2 className="fw-bolder">Enter KYC Details</h2>
          <hr />
          <Form onSubmit={kycDetails.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="aadharNo"
                type="text"
                maxLength={12}
                placeholder="Enter Aadhar Card Number"
                value={kycDetails.values.aadharNo}
                onChange={kycDetails.handleChange}
                onBlur={kycDetails.handleBlur}
              />
              {kycDetails.touched.aadharNo && kycDetails.errors.aadharNo && (
                <span className="text-danger">
                  <small>{kycDetails.errors.aadharNo}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="panNo"
                type="text"
                maxLength={10}
                placeholder="Enter Pan Card Number"
                value={kycDetails.values.panNo}
                onChange={kycDetails.handleChange}
                onBlur={kycDetails.handleBlur}
              />
              {kycDetails.touched.panNo && kycDetails.errors.panNo && (
                <span className="text-danger">
                  <small>{kycDetails.errors.panNo}</small>
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="address"
                as="textarea"
                rows={3}
                placeholder="Enter Address"
                value={kycDetails.values.address}
                onChange={kycDetails.handleChange}
                onBlur={kycDetails.handleBlur}
              />
              {kycDetails.touched.address && kycDetails.errors.address && (
                <span className="text-danger">
                  <small>{kycDetails.errors.address}</small>
                </span>
              )}
            </Form.Group>

            <div className="d-flex gap-4 align-items-center justify-content-between">
              <img src={preview} height="150px" width="150px" className="rounded-2" />
              <Form.Group>
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  accept="image/*"
                  required={true}
                  onChange={handleImageUpload}
                />
              </Form.Group>
            </div>

            <div className="d-flex gap-5 mt-3">
              <Button
                variant="secondary"
                type="button"
                className="w-100"
                onClick={() => setShowKycForm(false)}
              >
                Back
              </Button>
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </div>
          </Form>

        </section>
      )}
    </>
  );
}

export default Signup;
