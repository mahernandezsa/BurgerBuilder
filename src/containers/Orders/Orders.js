import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const orders = (props) => {
  const { onFecthOrders } = props;
  useEffect(() => {
    onFecthOrders(props.token, props.userId);
  }, [onFecthOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToprops = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFecthOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
