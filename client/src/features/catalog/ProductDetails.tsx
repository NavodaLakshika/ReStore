import {
  Divider,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProductDetails() {


  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // don't forget to set loading state to true
    agent.Catalog.details(parseInt(id!))
      .then(response => setProduct(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);






   
  if (!product) return <NotFound/>
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
      <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div style={{ flex: "700px", minWidth: "200px" }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>{product.name}</Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h4" color="secondary" style={{ fontWeight: 'bold' }}>
          ${(product.price / 1000).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
