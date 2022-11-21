import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";

const ActivitylogPage = () => {

    const [activity, setActivity] = useState("");

    useEffect(() => {
        activityLogs();
    }, []);

    const activityLogs = async () => {
        await AuthService.getActivityLogs().then(async result => {
            if (result.success) {
                setActivity(result.data)
            } else {
                alertErrorMessage(result.message);
            }
        });
    };

    console.log(activity, 'activity');

    return (
        <>
            <div class="tab-pane" id="ActivityPill" role="tabpanel" aria-labelledby="Activity-pill">
                <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 class="mb-1">
                            Activity Logs
                        </h3>
                        <p class="formate mb-0">
                            your  Activity Logs display for all Activity
                        </p>
                    </div>
                </div>
                {Object.keys(activity).length === 0 ?
                    <div className="favouriteData">
                        <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                        <br />
                        <p className="mt-3 mb-4" > No Data Found. </p>
                    </div>
                    :
                    <div class="row">
                        <div class="col-md-12 m-auto">
                            <div class="form-field-wrapper table_scroll p-0 switch_btn  border-dashed border-gray-300 bg-lighten card-rounded">
                                <div class="activity-wrapper">
                                    <div class="custom-history">
                                        {activity.length > 0 ?
                                            activity.map(item =>
                                                <div class="single-item-history d-flex-center p-3 m-0">
                                                    <div class="content">
                                                        <p> Status: {item?.activity}
                                                            <br /> IP: {item?.ip}</p>
                                                    </div>
                                                    <small class="date align-self-start">
                                                        {moment(item?.date).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </small>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default ActivitylogPage;