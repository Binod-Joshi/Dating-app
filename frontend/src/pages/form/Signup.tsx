"use client";

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { log } from "console";

interface CopyrightProps {
  sx?: object;
}

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://binodjoshi.netlify.app"
        target="_blank"
      >
        Binod Joshi Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const defaultTheme = createTheme();

interface Location {
  latitude: number;
  longitude: number;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNum: string;
  password: string;
  dateOfBirth: Dayjs | null;
  gender: string;
  sexualOrientation: string;
  country: string;
  state: string;
  city: string;
  profilePictureUrl: string;
  bio: string;
  location: Location;
  lookingFor: string;
}

const Signup: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs());
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    mobileNum: "",
    password: "",
    dateOfBirth: dayjs(),
    gender: "",
    sexualOrientation: "",
    country: "",
    state: "",
    city: "",
    profilePictureUrl: "",
    bio: "",
    location: { latitude: 0, longitude: 0 },
    lookingFor: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required."),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // Handle form submission here
    },
  });

  const handleCountryChange = async (event:any) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    fetchStates(countryCode);
    // await setStates(fetchStates(countryCode));
    setSelectedState("");
    setCities([]);
  };

  const handleStateChange = async (event:any) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setCities(await fetchCities(stateCode));
  };

  useEffect(() => {
    // Define an async function to fetch countries
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    // Call the async function
    fetchCountries();
  }, []);

  const fetchStates = async (countryCode: string) => {
    try {
      const response = await fetch(`https://example-api.com/states?country=${countryCode}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // Set the states data to your state
      setStates(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateCode:any) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/search?adminCode1=${stateCode}&username=YOUR_GEONAMES_USERNAME`
      );
      const data = await response.json();
      return data.geonames || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            {/* Formik form */}
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  width: "90vw",
                  mt: 1,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: "16px",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mobileNum"
                  label="Mobile Number"
                  name="mobileNum"
                  autoComplete="mobileNum"
                  value={formik.values.mobileNum}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.mobileNum && formik.errors.mobileNum
                      ? formik.errors.mobileNum
                      : ""
                  }
                  error={
                    formik.touched.mobileNum && Boolean(formik.errors.mobileNum)
                  }
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={(newValue) => {
                      setDateOfBirth(newValue);
                      formik.setFieldValue("dateOfBirth", newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        id: "dateOfBirth",
                        name: "dateOfBirth",
                        error:
                          formik.touched.dateOfBirth &&
                          Boolean(formik.errors.dateOfBirth),
                        helperText:
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth,
                      },
                    }}
                  />
                </LocalizationProvider>

                {/* Gender Select */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput label="Gender" />}
                  >
                    <MenuItem value="">
                      <em>Gender</em>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography variant="body2" color="error">
                      {formik.errors.gender}
                    </Typography>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={
                    formik.touched.sexualOrientation &&
                    Boolean(formik.errors.sexualOrientation)
                  }
                >
                  <InputLabel id="sexualOrientation-label">
                    Interested in?
                  </InputLabel>
                  <Select
                    labelId="sexualOrientation-label"
                    id="sexualOrientation"
                    name="sexualOrientation"
                    value={formik.values.sexualOrientation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput label="sexualOrientation" />}
                  >
                    <MenuItem value="">
                      <em>What are you interested in?</em>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography variant="body2" color="error">
                      {formik.errors.gender}
                    </Typography>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                >
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    input={<OutlinedInput label="Country" />}
                    value={formik.values.country}
                    onChange={(event) => {
                      formik.handleChange(event);
                      handleCountryChange(event);
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {countries.map((country: any) => (
                      <MenuItem key={country.cca3} value={country.cca3}>
                        {country.name.common}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.country && formik.errors.country && (
                    <Typography variant="body2" color="error">
                      {formik.errors.country}
                    </Typography>
                  )}
                </FormControl>

                {/* State Selector */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.state && Boolean(formik.errors.state)}
                >
                  <InputLabel id="state-label">State</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={(event) => {
                      formik.handleChange(event);
                      handleStateChange(event);
                    }}
                    onBlur={formik.handleBlur}
                    disabled={!selectedCountry}
                  >
                    {states?.map((state: any) => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.state && formik.errors.state && (
                    <Typography variant="body2" color="error">
                      {formik.errors.state}
                    </Typography>
                  )}
                </FormControl>

                {/* City Selector */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.city && Boolean(formik.errors.city)}
                >
                  <InputLabel id="city-label">City</InputLabel>
                  <Select
                    labelId="city-label"
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!selectedState}
                  >
                    {cities.map((city: any) => (
                      <MenuItem key={city.geonameId} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.city && formik.errors.city && (
                    <Typography variant="body2" color="error">
                      {formik.errors.city}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bio"
                  label="Bio"
                  type="bio"
                  id="bio"
                  autoComplete="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.bio && formik.errors.bio
                      ? formik.errors.bio
                      : ""
                  }
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lookingFor"
                  label="Looking For"
                  type="lookingFor"
                  id="lookingFor"
                  autoComplete="lookingFor"
                  value={formik.values.lookingFor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.lookingFor && formik.errors.lookingFor
                      ? formik.errors.lookingFor
                      : ""
                  }
                  error={
                    formik.touched.lookingFor &&
                    Boolean(formik.errors.lookingFor)
                  }
                />
              </Box>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
