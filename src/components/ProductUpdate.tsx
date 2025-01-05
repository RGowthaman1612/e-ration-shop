import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Model from "react-modal";
import { Product } from "./types";

export const ProductUpdate = () => {
  const navigate = useNavigate();
  const [orderFormVisible, setOrderFormVisible] = useState(true);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [updatedProducts, setUpdatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:5555/api/product/productMap`
      );
      setDbProducts(response.data);
      setUpdatedProducts(response.data);
      console.log("dbProducts received:", response.data);
    } catch (error) {
      console.error("Error fetching dbproducts:", error);
    }
  };

  const close = () => {
    setOrderFormVisible(false);
    navigate("/home");
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newUpdatedProducts = [...updatedProducts];
    newUpdatedProducts[index] = {
      ...newUpdatedProducts[index],
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    };
    setUpdatedProducts(newUpdatedProducts);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const productsToUpdate = updatedProducts.filter(
      (product, index) =>
        product.quantity !== dbProducts[index].quantity ||
        product.price !== dbProducts[index].price
    );
    console.log(productsToUpdate);
    if (productsToUpdate.length === 0) {
      alert("Please update at least one product.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5555/api/product/productUpdateAdd",
        productsToUpdate
      );

      if (response.status === 200) {
        alert("Products updated successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
          if (response.status === 500) {
            alert("Failed to update products. Please try again.");
          } else if (response.status === 409) {
            alert("Products already updated");
          }
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
        console.error("Axios error updating products:", error);
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
          <h1>Update Products</h1>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="row"
            spacing={2} // adds space between items
            justifyContent="space-around"
            alignItems="center"
          >
            {updatedProducts.map((product, index) => (
              <Grid key={product.productName} item xs={12} sm={6} md={4}>
                <h3 style={{ marginBottom: "16px" }}>{product.productName}</h3>

                <TextField
                  id={`quantity-${index}`}
                  label="Quantity"
                  name="quantity"
                  type="number"
                  variant="outlined"
                  value={product.quantity}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    inputProps: { min: 0 },
                    style: { fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "1rem", fontWeight: "bold" },
                  }}
                  required
                />

                <TextField
                  id={`price-${index}`}
                  label="Price"
                  name="price"
                  type="number"
                  variant="outlined"
                  value={product.price}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    inputProps: { min: 0 },
                    style: { fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "1rem", fontWeight: "bold" },
                  }}
                  required
                />
              </Grid>
            ))}
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
