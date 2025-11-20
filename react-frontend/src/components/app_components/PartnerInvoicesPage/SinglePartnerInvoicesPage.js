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


const SinglePartnerInvoicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [partnerId, setPartnerId] = useState([]);
const [paymentId, setPaymentId] = useState([]);
const [tenantInvoices, setTenantInvoices] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("partnerInvoices")
            .get(urlParams.singlePartnerInvoicesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"partnerId","paymentId","tenantInvoices"] }})
            .then((res) => {
                set_entity(res || {});
                const partnerId = Array.isArray(res.partnerId)
            ? res.partnerId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.partnerId
                ? [{ _id: res.partnerId._id, name: res.partnerId.name }]
                : [];
        setPartnerId(partnerId);
const paymentId = Array.isArray(res.paymentId)
            ? res.paymentId.map((elem) => ({ _id: elem._id, sessionId: elem.sessionId }))
            : res.paymentId
                ? [{ _id: res.paymentId._id, sessionId: res.paymentId.sessionId }]
                : [];
        setPaymentId(paymentId);
const tenantInvoices = Array.isArray(res.tenantInvoices)
            ? res.tenantInvoices.map((elem) => ({ _id: elem._id, tenantId: elem.tenantId }))
            : res.tenantInvoices
                ? [{ _id: res.tenantInvoices._id, tenantId: res.tenantInvoices.tenantId }]
                : [];
        setTenantInvoices(tenantInvoices);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "PartnerInvoices", type: "error", message: error.message || "Failed get partnerInvoices" });
            });
    }, [props,urlParams.singlePartnerInvoicesId]);


    const goBack = () => {
        navigate("/partnerInvoices");
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
                    <h3 className="m-0">Partner Invoices</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>partnerInvoices/{urlParams.singlePartnerInvoicesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TotalAmount</label><p className="m-0 ml-3" >{_entity?.totalAmount}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PaymentStatus</label><p className="m-0 ml-3" >{_entity?.paymentStatus}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PartnerID</label>
                    {partnerId.map((elem) => (
                        <Link key={elem._id} to={`/partners/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PaymentID</label>
                    {paymentId.map((elem) => (
                        <Link key={elem._id} to={`/payments/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.sessionId}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">TenantInvoices</label>
                    {tenantInvoices.map((elem) => (
                        <Link key={elem._id} to={`/tenantInvoices/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.tenantId}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singlePartnerInvoicesId}
        user={props.user}
        alert={props.alert}
        serviceName="partnerInvoices"
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

export default connect(mapState, mapDispatch)(SinglePartnerInvoicesPage);
