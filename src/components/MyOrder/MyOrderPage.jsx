import React, { useEffect, useState } from "react";
import "./MyOrderPage.css";
import Table from "../Common/Table";
import { myOrderAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import useData from "../hooks/useData";
import Loader from "../Common/Loader";

const MyOrderPage = () => {
  //const [order, setOrder] = useState([]);
  const { data: order = [], isLoading, error } = useData("/order");
  console.log("order");
  //const order = data?.data || [];
  // useEffect(() => {
  //   myOrderAPI()
  //     .then((res) => {
  //       console.log(res);
  //       setOrder(res.data);
  //     })
  //     .catch((err) => toast.error("Order API failed"));
  // }, []);
  return (
    <div className="my_order_page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        {isLoading && <Loader></Loader>}
        {error && <em className="form_error">{error}</em>}
        <tbody>
          {order &&
            order.length > 0 &&
            order.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {data.products.map(
                    (element) =>
                      `${element.product.title}(${element.quantity}), `
                  )}
                </td>
                <td>{data.total}</td>
                <td>{data.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyOrderPage;
