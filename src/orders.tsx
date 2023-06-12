import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from "@mui/material";
import axios from "axios";
import { useRecordContext } from "ra-core";
import React, { useState } from "react";
import {
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleList,
  TextField
} from "react-admin";

export const OrderList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.ordername}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="code" label="Mã đơn hàng"/>
          <TextField source="createdAt" label="Ngày tạo"/>
          <TextField source="total" label="Tổng tiền"/>
          <TextField source="status" label="Trạng thái đơn"/>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

const OrderTitle = () => {
  const record = useRecordContext();
  return <span>Order {record ? `"${record.title}"` : ""}</span>;
};

export const OrderEdit = (props) => {


  return (
    <Edit title="Edit Order" {...props}>
      <OrderDetail />
    </Edit>
  );
};

const useStyles = makeStyles({
  tableRow: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  avatarCell: {
    width: "15%",
  },
  nameCell: {
    width: "25%",
  },
  quantityCell: {
    width: "20%",
  },
  totalCell: {
    width: "20%",
  },
  feeCell: {
    width: "20%",
  },
});

const OrderDetail = () => {
  const record = useRecordContext();
  const classes = useStyles();

  const order = record?.data?.[0]?.[0]?.order;

  if (!order) return (<></>)
  console.log(order)

  const payVendor = order.payVendor
  const paymentMethod = order.paymentMethod === "online"
  const token = localStorage.getItem("auth");

  const handlePayClick = async () => {
    await axios.get(
      `https://dhwatch.onrender.com/api/order/pay-vendor/${record.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };


  return (
    <Card>
      <CardHeader title={`Đơn hàng`} />
      <OrderStatusUpdater record={order} token={token} />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.avatarCell}>Sản phẩm</TableCell>
              <TableCell className={classes.nameCell}>Tên Sản phẩm</TableCell>
              <TableCell className={classes.quantityCell}>Số lượng</TableCell>
              <TableCell className={classes.totalCell}>Tổng tiền</TableCell>
              <TableCell className={classes.feeCell}>Phí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {record.data[0].map((item, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.avatarCell}>
                  <Avatar alt={item.watch.name} src={item.watch.image[0]} />
                </TableCell>
                <TableCell className={classes.nameCell}>
                  <Typography variant="subtitle1">{item.watch.name}</Typography>
                </TableCell>
                <TableCell className={classes.quantityCell}>
                  <Typography variant="body1"> {item.quantity}</Typography>
                </TableCell>
                <TableCell className={classes.totalCell}>
                  <Typography variant="body1"> {item.total}</Typography>
                </TableCell>
                <TableCell className={classes.feeCell}>
                  <Typography variant="body1"> {item.fee}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ShopCard shop={order.shop}/>
        <Button
          variant="contained"
          color="warning"
          disabled={!(!payVendor && paymentMethod)}
          style={{ marginTop: "150px", display: "block", margin: "0 auto" }}
          onClick={handlePayClick}
        >
          Thanh toán cho chủ shop
        </Button>
      </CardContent>
    </Card>
  );
};

function OrderStatusUpdater({ record, token }) {
  const [status, setStatus] = useState(record.status);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`https://dhwatch.onrender.com/api/order/id/${record.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      // Optionally update the record with the new status
      record.status = status;

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-status-updater">
      <FormControl>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value="created">Tạo mới</MenuItem>
          <MenuItem value="confirm">Xác nhận</MenuItem>
          <MenuItem value="delivering">Đang giao hàng</MenuItem>
          <MenuItem value="delivered">Đã giao hàng</MenuItem>
          <MenuItem value="cancel">Huỷ đơn</MenuItem>
          <MenuItem value="done">Hoàn thành</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleStatusUpdate}>
        Update Status
      </Button>
      <style>{`
        .order-status-updater {
          display: flex;
          align-items: center;
          justifyContent: flex-end
        }
        .order-status-updater > * {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}


const use2Styles = makeStyles({
  root: {
    width: 400,
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  media: {
    height: 200,
    backgroundSize: 'contain',
  },
});

function ShopCard({ shop }) {
  const classes = use2Styles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={shop.banner} title={shop.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {shop.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {shop.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {shop.address}, {shop.ward}, {shop.district}, {shop.province}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Phone: {shop.phoneNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Email: {shop.email}
        </Typography>
      </CardContent>
    </Card>
  );
}







