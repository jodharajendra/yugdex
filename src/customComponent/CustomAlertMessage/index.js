import Swal from "sweetalert2";

function alertErrorMessage(message) {

  Swal.fire('', message, 'error');
}

function alertSuccessMessage(message) {

  Swal.fire('', message, 'success');
}



function alertSuccessMessageTrade(data) {
  let a = data?.quantity
  let b = data?.tds
  let c = data?.fee
  let d = data?.totAmount
  let html = ` 
  <div class="flex_amount" >
    <div class="d-flex  flex_a" >
    <strong>Quantity</strong> ${a?.toString()} 
    </div>
    <div class=" d-flex  flex_a" >
    <strong>TDS </strong> ${b?.toString()} 
    </div>
    <div class="d-flex  flex_a" >
    <strong>Fee</strong>   ${c?.toString()} 
    </div>
    <div class=" d-flex  flex_a" >
    <strong>Total</strong>  <strong>${d?.toString()}</strong>
    </div>
    <small class="mt-3 d-block" > <small>Fee: Maker: 0.2% | Taker: 0.2% | TDS: 1.0% |  Incl. of all applicable taxes</small> </small>
  </div>
   `
  Swal.fire(data?.message, html, 'success');
}





export { alertErrorMessage, alertSuccessMessage, alertSuccessMessageTrade };