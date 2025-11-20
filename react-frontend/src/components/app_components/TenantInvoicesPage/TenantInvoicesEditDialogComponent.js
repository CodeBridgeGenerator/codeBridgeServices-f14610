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

const TenantInvoicesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [tenantId, setTenantId] = useState([])
const [usageLogs, setUsageLogs] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount tenants
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
                    //on mount usageLogs
                    client
                        .service("usageLogs")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsageLogsId } })
                        .then((res) => {
                            setUsageLogs(res.data.map((e) => { return { name: e['requestId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "UsageLogs", type: "error", message: error.message || "Failed get usageLogs" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            tenantId: _entity?.tenantId?._id,
period: _entity?.period,
totalAmount: _entity?.totalAmount,
usageLogs: _entity?.usageLogs?._id,
generatedAt: _entity?.generatedAt,
        };

        setLoading(true);
        try {
            
        await client.service("tenantInvoices").patch(_entity._id, _data);
        const eagerResult = await client
            .service("tenantInvoices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "tenantId",
                    service : "tenants",
                    select:["name"]},{
                    path : "usageLogs",
                    service : "usageLogs",
                    select:["requestId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info tenantInvoices updated successfully" });
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

    const tenantIdOptions = tenantId.map((elem) => ({ name: elem.name, value: elem.value }));
const usageLogsOptions = usageLogs.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Tenant Invoices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="tenantInvoices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tenantId">TenantID:</label>
                <Dropdown id="tenantId" value={_entity?.tenantId?._id} optionLabel="name" optionValue="value" options={tenantIdOptions} onChange={(e) => setValByKey("tenantId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tenantId"]) && (
              <p className="m-0" key="error-tenantId">
                {error["tenantId"]}
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
                <label htmlFor="usageLogs">UsageLogs:</label>
                <Dropdown id="usageLogs" value={_entity?.usageLogs?._id} optionLabel="name" optionValue="value" options={usageLogsOptions} onChange={(e) => setValByKey("usageLogs", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["usageLogs"]) && (
              <p className="m-0" key="error-usageLogs">
                {error["usageLogs"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="generatedAt">GeneratedAt:</label>
                <Calendar id="generatedAt"  value={_entity?.generatedAt ? new Date(_entity?.generatedAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("generatedAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["generatedAt"]) && (
              <p className="m-0" key="error-generatedAt">
                {error["generatedAt"]}
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

export default connect(mapState, mapDispatch)(TenantInvoicesEditDialogComponent);
