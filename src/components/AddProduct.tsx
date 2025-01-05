import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Model from "react-modal";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [orderFormVisible, setOrderFormVisible] = useState(true);

  // State for the single product
  const [product, setProduct] = useState({
    productName: "",
    quantity: 1,
    price: 1,
  });

  const close = () => {
    setOrderFormVisible(false);
    navigate("/home");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update the product state dynamically
    setProduct({
      ...product,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send the single product to the API
      const response = await axios.post(
        "http://localhost:5555/api/product/addProduct",
        product
      );

      if (response.status === 200) {
        alert("Product added successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
          if (response.status === 500) {
            alert("Failed to add product. Please try again.");
          } else if (response.status === 409) {
            alert("Product already exists.");
          }
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
        console.error("Axios error adding product:", error);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      close();
    }
  };

  return (
    <Model isOpen={orderFormVisible} onRequestClose={close}>
      <Grid sx={{ position: "relative" }}>
        <Button
          onClick={close}
          sx={{
            position: "absolute",
            top: -30,
            right: -1,
            minWidth: "auto",
            padding: "8px",
            lineHeight: 1,
            fontSize: "3rem",
            color: "black",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </Button>

        <Grid sx={{ textAlign: "center", m: 2, color: "slategrey" }}>
          <h1>Add Product</h1>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            spacing={1}
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              label="Product Name"
              name="productName"
              variant="outlined"
              type="text"
              value={product.productName}
              onChange={handleInputChange}
              InputProps={{
                style: { fontSize: "1.2rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.2rem", fontWeight: "bold" },
              }}
              sx={{ marginBottom: 3, marginTop: 4 }}
              required
            />
            <TextField
              label="Quantity"
              name="quantity"
              variant="outlined"
              type="number"
              value={product.quantity}
              onChange={handleInputChange}
              InputProps={{
                style: { fontSize: "1.2rem" },
                inputProps: {
                  min: 1,
                },
              }}
              InputLabelProps={{
                style: { fontSize: "1.2rem", fontWeight: "bold" },
              }}
              sx={{ marginBottom: 3 }}
              required
            />
            <TextField
              label="Price"
              name="price"
              variant="outlined"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              InputProps={{
                style: { fontSize: "1.2rem" },
                inputProps: {
                  min: 1,
                },
              }}
              InputLabelProps={{
                style: { fontSize: "1.2rem", fontWeight: "bold" },
              }}
              sx={{ marginBottom: 3 }}
              required
            />
          </Grid>

          <Grid sx={{ textAlign: "center", m: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontSize: "1rem",
                padding: "10px 20px",
              }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Model>
  );
};
