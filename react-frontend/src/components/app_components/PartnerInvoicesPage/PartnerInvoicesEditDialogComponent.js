/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PartnerInvoicesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [partnerId, setPartnerId] = useState([])
const [paymentId, setPaymentId] = useState([])
const [tenantInvoices, setTenantInvoices] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount partners
                    client
                        .service("partners")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePartnersId } })
                        .then((res) => {
                            setPartnerId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Partners", type: "error", message: error.message || "Failed get partners" });
                        });
                }, []);
 useEffect(() => {
                    //on mount payments
                    client
                        .service("payments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePaymentsId } })
                        .then((res) => {
                            setPaymentId(res.data.map((e) => { return { name: e['sessionId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Payments", type: "error", message: error.message || "Failed get payments" });
                        });
                }, []);
 useEffect(() => {
                    //on mount tenantInvoices
                    client
                        .service("tenantInvoices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTenantInvoicesId } })
                        .then((res) => {
                            setTenantInvoices(res.data.map((e) => { return { name: e['tenantId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "TenantInvoices", type: "error", message: error.message || "Failed get tenantInvoices" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            partnerId: _entity?.partnerId?._id,
paymentId: _entity?.paymentId?._id,
period: _entity?.period,
totalAmount: _entity?.totalAmount,
paymentStatus: _entity?.paymentStatus,
tenantInvoices: _entity?.tenantInvoices?._id,
dueDate: _entity?.dueDate,
        };

        setLoading(true);
        try {
            
        await client.service("partnerInvoices").patch(_entity._id, _data);
        const eagerResult = await client
            .service("partnerInvoices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "partnerId",
                    service : "partners",
                    select:["name"]},{
                    path : "paymentId",
                    service : "payments",
                    select:["sessionId"]},{
                    path : "tenantInvoices",
                    service : "tenantInvoices",
                    select:["tenantId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info partnerInvoices updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const partnerIdOptions = partnerId.map((elem) => ({ name: elem.name, value: elem.value }));
const paymentIdOptions = paymentId.map((elem) => ({ name: elem.name, value: elem.value }));
const tenantInvoicesOptions = tenantInvoices.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Partner Invoices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="partnerInvoices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="partnerId">PartnerID:</label>
                <Dropdown id="partnerId" value={_entity?.partnerId?._id} optionLabel="name" optionValue="value" options={partnerIdOptions} onChange={(e) => setValByKey("partnerId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["partnerId"]) && (
              <p className="m-0" key="error-partnerId">
                {error["partnerId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentId">PaymentID:</label>
                <Dropdown id="paymentId" value={_entity?.paymentId?._id} optionLabel="name" optionValue="value" options={paymentIdOptions} onChange={(e) => setValByKey("paymentId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentId"]) && (
              <p className="m-0" key="error-paymentId">
                {error["paymentId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="period">Period:</label>
                <Calendar id="period"  value={_entity?.period ? new Date(_entity?.period) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("period", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["period"]) && (
              <p className="m-0" key="error-period">
                {error["period"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAmount">TotalAmount:</label>
                <InputText id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) && (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentStatus">PaymentStatus:</label>
                <InputText id="paymentStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentStatus} onChange={(e) => setValByKey("paymentStatus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentStatus"]) && (
              <p className="m-0" key="error-paymentStatus">
                {error["paymentStatus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tenantInvoices">TenantInvoices:</label>
                <Dropdown id="tenantInvoices" value={_entity?.tenantInvoices?._id} optionLabel="name" optionValue="value" options={tenantInvoicesOptions} onChange={(e) => setValByKey("tenantInvoices", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tenantInvoices"]) && (
              <p className="m-0" key="error-tenantInvoices">
                {error["tenantInvoices"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDate">DueDate:</label>
                <Calendar id="dueDate"  value={_entity?.dueDate ? new Date(_entity?.dueDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dueDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDate"]) && (
              <p className="m-0" key="error-dueDate">
                {error["dueDate"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PartnerInvoicesEditDialogComponent);
