import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
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

const ServicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {isActive: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
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
            name: _entity?.name,description: _entity?.description,initialPrice: _entity?.initialPrice,metricName: _entity?.metricName,metricUnit: _entity?.metricUnit,ratePerUnit: _entity?.ratePerUnit,isActive: _entity?.isActive || false,calculationFn: _entity?.calculationFn,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("services").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Services created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Services" });
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

    

    return (
        <Dialog header="Create Services" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="services-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="initialPrice">InitialPrice:</label>
                <InputNumber id="initialPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.initialPrice} onChange={(e) => setValByKey("initialPrice", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["initialPrice"]) ? (
              <p className="m-0" key="error-initialPrice">
                {error["initialPrice"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="metricName">MetricName:</label>
                <InputText id="metricName" className="w-full mb-3 p-inputtext-sm" value={_entity?.metricName} onChange={(e) => setValByKey("metricName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["metricName"]) ? (
              <p className="m-0" key="error-metricName">
                {error["metricName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="metricUnit">MetricUnit:</label>
                <InputText id="metricUnit" className="w-full mb-3 p-inputtext-sm" value={_entity?.metricUnit} onChange={(e) => setValByKey("metricUnit", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["metricUnit"]) ? (
              <p className="m-0" key="error-metricUnit">
                {error["metricUnit"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="ratePerUnit">RatePerUnit:</label>
                <InputNumber id="ratePerUnit" className="w-full mb-3 p-inputtext-sm" value={_entity?.ratePerUnit} onChange={(e) => setValByKey("ratePerUnit", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ratePerUnit"]) ? (
              <p className="m-0" key="error-ratePerUnit">
                {error["ratePerUnit"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="calculationFn">CalculationFn:</label>
                <InputText id="calculationFn" className="w-full mb-3 p-inputtext-sm" value={_entity?.calculationFn} onChange={(e) => setValByKey("calculationFn", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["calculationFn"]) ? (
              <p className="m-0" key="error-calculationFn">
                {error["calculationFn"]}
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

export default connect(mapState, mapDispatch)(ServicesCreateDialogComponent);
