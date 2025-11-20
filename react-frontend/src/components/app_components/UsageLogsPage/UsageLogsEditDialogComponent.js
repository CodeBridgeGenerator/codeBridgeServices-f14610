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
import { InputNumber } from 'primereact/inputnumber';
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

const UsageLogsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [tenantServices, setTenantServices] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount tenantServices
                    client
                        .service("tenantServices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTenantServicesId } })
                        .then((res) => {
                            setTenantServices(res.data.map((e) => { return { name: e['serviceId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "TenantServices", type: "error", message: error.message || "Failed get tenantServices" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            tenantServices: _entity?.tenantServices?._id,
apiKey: _entity?.apiKey,
requestId: _entity?.requestId,
unitsConsumed: _entity?.unitsConsumed,
unitRate: _entity?.unitRate,
cost: _entity?.cost,
metaData: _entity?.metaData,
dateOfUsage: _entity?.dateOfUsage,
        };

        setLoading(true);
        try {
            
        await client.service("usageLogs").patch(_entity._id, _data);
        const eagerResult = await client
            .service("usageLogs")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "tenantServices",
                    service : "tenantServices",
                    select:["serviceId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info usageLogs updated successfully" });
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

    const tenantServicesOptions = tenantServices.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Usage Logs" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="usageLogs-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tenantServices">TenantServices:</label>
                <Dropdown id="tenantServices" value={_entity?.tenantServices?._id} optionLabel="name" optionValue="value" options={tenantServicesOptions} onChange={(e) => setValByKey("tenantServices", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tenantServices"]) && (
              <p className="m-0" key="error-tenantServices">
                {error["tenantServices"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="apiKey">ApiKey:</label>
                <InputText id="apiKey" className="w-full mb-3 p-inputtext-sm" value={_entity?.apiKey} onChange={(e) => setValByKey("apiKey", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["apiKey"]) && (
              <p className="m-0" key="error-apiKey">
                {error["apiKey"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestId">RequestID:</label>
                <InputText id="requestId" className="w-full mb-3 p-inputtext-sm" value={_entity?.requestId} onChange={(e) => setValByKey("requestId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestId"]) && (
              <p className="m-0" key="error-requestId">
                {error["requestId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitsConsumed">UnitsConsumed:</label>
                <InputNumber id="unitsConsumed" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitsConsumed} onChange={(e) => setValByKey("unitsConsumed", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitsConsumed"]) && (
              <p className="m-0" key="error-unitsConsumed">
                {error["unitsConsumed"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitRate">UnitRate:</label>
                <InputNumber id="unitRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitRate} onChange={(e) => setValByKey("unitRate", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitRate"]) && (
              <p className="m-0" key="error-unitRate">
                {error["unitRate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cost">Cost:</label>
                <InputNumber id="cost" className="w-full mb-3 p-inputtext-sm" value={_entity?.cost} onChange={(e) => setValByKey("cost", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cost"]) && (
              <p className="m-0" key="error-cost">
                {error["cost"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="metaData">MetaData:</label>
                <InputText id="metaData" className="w-full mb-3 p-inputtext-sm" value={_entity?.metaData} onChange={(e) => setValByKey("metaData", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["metaData"]) && (
              <p className="m-0" key="error-metaData">
                {error["metaData"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateOfUsage">DateOfUsage:</label>
                <Calendar id="dateOfUsage"  value={_entity?.dateOfUsage ? new Date(_entity?.dateOfUsage) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateOfUsage", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateOfUsage"]) && (
              <p className="m-0" key="error-dateOfUsage">
                {error["dateOfUsage"]}
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

export default connect(mapState, mapDispatch)(UsageLogsEditDialogComponent);
