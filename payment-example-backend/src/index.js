const express = require("express");

const app = express();
const PORT = 3004;

app.get("/hello-word", (req, res) => {
    res.status(200).json("xin chạo!");
});

const vnp_TmnCode = "YOUR_VNP_TMNCODE";
const vnp_HashSecret = "YOUR_VNP_HASHSECRET";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:3000/vnpay_return";

app.post("/create_payment_url", (req, res) => {
    const tmnCode = "2QXUI4J4";
    const secretKey = vnp_HashSecret;
    const vnpUrl = vnp_Url;
    const returnUrl = vnp_ReturnUrl;

    const date = new Date();
    const createDate = date.toISOString().replace(/T/, "").replace(/\..+/, "");
    const orderId = date.getTime();
    const amount = req.body.amount * 100;
    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    const locale = req.body.language || "vn";
    const currCode = "VND";
    const vnp_Params = {};

    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;

    // vnp_Params["vnp_SecureHashType"] = "SHA256";
    // vnp_Params["vnp_SecureHash"] = crypto
    //     .createHmac("sha256", secretKey)
    //     .update(qs.stringify(vnp_Params, { encode: false }))
    //     .digest("hex");

    const paymentUrl = `${vnpUrl}?${vnp_Params}`;
    res.json({ paymentUrl });
});

app.listen(PORT, () => {
    console.log(`server chạy trên cổng ${PORT}`);
});
