import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const TenantServicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [tenantId, setTenantId] = useState([])
const [paymentId, setPaymentId] = useState([])
const [serviceId, setServiceId] = useState([])

    useEffect(() => {
        let init  = {isActive: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [tenantId,paymentId,serviceId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            tenantId: _entity?.tenantId?._id,paymentId: _entity?.paymentId?._id,serviceId: _entity?.serviceId?._id,paymentStatus: _entity?.paymentStatus,apiKey: _entity?.apiKey,isActive: _entity?.isActive || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("tenantServices").create(_data);
        const eagerResult = await client
            .service("tenantServices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "tenantId",
                    service : "tenants",
                    select:["name"]},{
                    path : "paymentId",
                    service : "payments",
                    select:["sessionId"]},{
                    path : "serviceId",
                    service : "services",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Tenant Services updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Tenant Services" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount tenants
                    client
                        .service("tenants")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTenantsId } })
                        .then((res) => {
                            setTenantId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Tenants", type: "error", message: error.message || "Failed get tenants" });
                        });
                }, []);

useEffect(() => {
                    // on mount payments
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
                    // on mount services
                    client
                        .service("services")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleServicesId } })
                        .then((res) => {
                            setServiceId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Services", type: "error", message: error.message || "Failed get services" });
                        });
                }, []);

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

    const tenantIdOptions = tenantId.map((elem) => ({ name: elem.name, value: elem.value }));
const paymentIdOptions = paymentId.map((elem) => ({ name: elem.name, value: elem.value }));
const serviceIdOptions = serviceId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Tenant Services" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="tenantServices-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tenantId">TenantID:</label>
                <Dropdown id="tenantId" value={_entity?.tenantId?._id} optionLabel="name" optionValue="value" options={tenantIdOptions} onChange={(e) => setValByKey("tenantId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tenantId"]) ? (
              <p className="m-0" key="error-tenantId">
                {error["tenantId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentId">PaymentID:</label>
                <Dropdown id="paymentId" value={_entity?.paymentId?._id} optionLabel="name" optionValue="value" options={paymentIdOptions} onChange={(e) => setValByKey("paymentId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentId"]) ? (
              <p className="m-0" key="error-paymentId">
                {error["paymentId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceId">ServiceID:</label>
                <Dropdown id="serviceId" value={_entity?.serviceId?._id} optionLabel="name" optionValue="value" options={serviceIdOptions} onChange={(e) => setValByKey("serviceId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceId"]) ? (
              <p className="m-0" key="error-serviceId">
                {error["serviceId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentStatus">PaymentStatus:</label>
                <InputText id="paymentStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentStatus} onChange={(e) => setValByKey("paymentStatus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentStatus"]) ? (
              <p className="m-0" key="error-paymentStatus">
                {error["paymentStatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="apiKey">ApiKey:</label>
                <InputText id="apiKey" className="w-full mb-3 p-inputtext-sm" value={_entity?.apiKey} onChange={(e) => setValByKey("apiKey", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["apiKey"]) ? (
              <p className="m-0" key="error-apiKey">
                {error["apiKey"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isActive">IsActive:</label>
                <Checkbox id="isActive" className="ml-3" checked={_entity?.isActive} onChange={(e) => setValByKey("isActive", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isActive"]) ? (
              <p className="m-0" key="error-isActive">
                {error["isActive"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(TenantServicesCreateDialogComponent);
