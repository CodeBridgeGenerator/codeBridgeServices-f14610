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

import PartnerInvoicesPage from "../PartnerInvoicesPage/PartnerInvoicesPage";

const SingleTenantInvoicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [tenantId, setTenantId] = useState([]);
const [usageLogs, setUsageLogs] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("tenantInvoices")
            .get(urlParams.singleTenantInvoicesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"tenantId","usageLogs"] }})
            .then((res) => {
                set_entity(res || {});
                const tenantId = Array.isArray(res.tenantId)
            ? res.tenantId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.tenantId
                ? [{ _id: res.tenantId._id, name: res.tenantId.name }]
                : [];
        setTenantId(tenantId);
const usageLogs = Array.isArray(res.usageLogs)
            ? res.usageLogs.map((elem) => ({ _id: elem._id, requestId: elem.requestId }))
            : res.usageLogs
                ? [{ _id: res.usageLogs._id, requestId: res.usageLogs.requestId }]
                : [];
        setUsageLogs(usageLogs);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "TenantInvoices", type: "error", message: error.message || "Failed get tenantInvoices" });
            });
    }, [props,urlParams.singleTenantInvoicesId]);


    const goBack = () => {
        navigate("/tenantInvoices");
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
                    <h3 className="m-0">Tenant Invoices</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>tenantInvoices/{urlParams.singleTenantInvoicesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TotalAmount</label><p className="m-0 ml-3" >{_entity?.totalAmount}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TenantID</label>
                    {tenantId.map((elem) => (
                        <Link key={elem._id} to={`/tenants/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">UsageLogs</label>
                    {usageLogs.map((elem) => (
                        <Link key={elem._id} to={`/usageLogs/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.requestId}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Partner Invoices" leftIcon="pi pi-building-columns mr-2">
                        <PartnerInvoicesPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleTenantInvoicesId}
        user={props.user}
        alert={props.alert}
        serviceName="tenantInvoices"
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

export default connect(mapState, mapDispatch)(SingleTenantInvoicesPage);
