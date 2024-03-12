import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

declare var WLResourceRequest: any;
declare var WLAuthorizationManager: any;
declare var WL: any;
@Component({
  selector: 'app-getbalance',
  templateUrl: './getbalance.page.html',
  styleUrls: ['./getbalance.page.scss'],
})
export class GetbalancePage implements OnInit {
  balance: string = "";
  loading: any;
  PinCodeChallengeHandler;
  constructor(private router: Router, public app_ref: ApplicationRef, public loader: LoadingController) { }

  ngOnInit() {
    this.pinCodeChallenge()
  }

  getBalance() {
    //this.show_balance_loading();
    var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/balance", WLResourceRequest.GET);
    resourceRequest.send().then(
      (response: any) => {
        console.log(response.responseText);
        this.balance = "&#36; " + response.responseText;
        this.app_ref.tick();
       // this.hide_loader();
      },
      (response: any) => {
        alert("Failed to get balance: " + JSON.stringify(response));
       // this.hide_loader();
      });
  }

  logout() {
    var securityCheckName = 'UserLogin';
    WLAuthorizationManager.logout(securityCheckName).then(
      () => {
        alert(" Successfully Logged out");
        this.router.navigate(['/']);
      },
      (response: any) => {
        alert("logout onFailure: " + JSON.stringify(response));
      });
  }

  async show_balance_loading() {
    const loading = await this.loader.create({
      message: 'Fetching balance...',

    });

    loading.present();
  }
  async hide_loader() {
    return await this.loader.dismiss().then(() => console.log('dismissed'));

  }


  pinCodeChallenge(){
    var PinCodeChallengeHandler = WL.Client.createSecurityCheckChallengeHandler("PinCodeAttempts");
     console.log(' this.PinCodeChallengeHandler', this.PinCodeChallengeHandler);
    PinCodeChallengeHandler.handleChallenge = function(challenge) {
        var msg = "";
  
        // Create the title string for the prompt
        if(challenge.errorMsg !== null){
            msg =  challenge.errorMsg + "\n";
        }
        else{
            msg = "This data requires a PIN code.\n";
        }
        msg += "Remaining attempts: " + challenge.remainingAttempts;
  
        // Display a prompt for user to enter the pin code
        var pinCode = prompt(msg, "");
        if(pinCode){ // calling submitChallengeAnswer with the entered value
           PinCodeChallengeHandler.submitChallengeAnswer({"pin":pinCode});
        }
        else{ // calling cancel in case user pressed the cancel button
           PinCodeChallengeHandler.cancel();
        }
  
  
    };
    // handleFailure
     PinCodeChallengeHandler.handleFailure = function(error) {
        WL.Logger.debug("Challenge Handler Failure!");
        if(error.failure !== null && error.failure !== undefined){
           alert(error.failure);
        }
        else {
           alert("Unknown error");
        }
    };
  }
}
