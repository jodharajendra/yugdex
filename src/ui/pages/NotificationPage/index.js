import React from "react";

const NotificationPage = () => {


    return (
        <>
            <div class="tab-pane" id="NotificationPill" role="tabpanel" aria-labelledby="Notification-pill">
                <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 class="mb-1">
                            Notification Preference
                        </h3>
                        <p class="formate mb-0">
                            Select your notification options for alerts.
                        </p>
                    </div>
                    {/* <!-- <button class=" btn btn-gradient btn-small justify-content-center" data-bs-toggle="modal" data-bs-target="#Withdraw_modal" ><span> Add New</span></button> --> */}
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="form-field-wrapper switch_btn  border-dashed border-gray-300 bg-lighten card-rounded p-4">
                            <div class="d-flex align-items-center justify-space-between">
                                <h6 class="mb-0 w-100">Account Status</h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                </div>
                            </div>
                            <hr />
                            <div class="d-flex align-items-center justify-space-between">
                                <h6 class="mb-0 w-100">Trade Status</h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" id="account_status2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotificationPage;