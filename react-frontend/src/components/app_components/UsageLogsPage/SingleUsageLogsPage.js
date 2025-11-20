import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import TenantInvoicesPage from "../TenantInvoicesPage/TenantInvoicesPage";

const SingleUsageLogsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [tenantServices, setTenantServices] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("usageLogs")
            .get(urlParams.singleUsageLogsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"tenantServices"] }})
            .then((res) => {
                set_entity(res || {});
                const tenantServices = Array.isArray(res.tenantServices)
            ? res.tenantServices.map((elem) => ({ _id: elem._id, serviceId: elem.serviceId }))
            : res.tenantServices
                ? [{ _id: res.tenantServices._id, serviceId: res.tenantServices.serviceId }]
                : [];
        setTenantServices(tenantServices);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UsageLogs", type: "error", message: error.message || "Failed get usageLogs" });
            });
    }, [props,urlParams.singleUsageLogsId]);


    const goBack = () => {
        navigate("/usageLogs");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Usage Logs</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>usageLogs/{urlParams.singleUsageLogsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">ApiKey</label><p className="m-0 ml-3" >{_entity?.apiKey}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">RequestID</label><p className="m-0 ml-3" >{_entity?.requestId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">UnitsConsumed</label><p className="m-0 ml-3" >{Number(_entity?.unitsConsumed)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">UnitRate</label><p className="m-0 ml-3" >{Number(_entity?.unitRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Cost</label><p className="m-0 ml-3" >{Number(_entity?.cost)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">MetaData</label><p className="m-0 ml-3" >{_entity?.metaData}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TenantServices</label>
                    {tenantServices.map((elem) => (
                        <Link key={elem._id} to={`/tenantServices/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.serviceId}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Tenant Invoices" leftIcon="pi pi-building-columns mr-2">
                        <TenantInvoicesPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleUsageLogsId}
        user={props.user}
        alert={props.alert}
        serviceName="usageLogs"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleUsageLogsPage);
