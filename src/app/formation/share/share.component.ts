import { Component, OnInit } from '@angular/core';
import {socialNetworks} from './socialNetwork';
import {ModalController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
 public sharingList = socialNetworks.socialShareOption;
  loader: any = null;
  sharingText = '';
  emailSubject = 'eCompagnon culturel:Ressource';
  recipent = [];
  sharingImage = '';
  sharingUrl = 'https://store.enappd.com';
  copiIcone: any;
  constructor(
      private modal: ModalController,
      private socialSharing: SocialSharing,
      private navParams: NavParams,
      private clipboard: Clipboard
  ) { }

    ngOnInit() {
      this.sharingUrl = this.navParams.get('url');
      this.sharingText = 'eCompagnon culturel-' + this.navParams.get('nom');
      this.copiIcone = 'copy';
    }
    closeModal() {
      this.modal.dismiss();
    }
    async shareVia(shareData) {
        if (shareData.shareType === 'viaEmail') {
            this.shareViaEmail();
        } else {
            if (shareData.shareType === 'viaCopy') {
                this.copy();
            } else {
                this.socialSharing[`${shareData.shareType}`](this.sharingText, this.sharingImage, this.sharingUrl)
                    .then((res) => {
                        this.modal.dismiss();
                    })
                    .catch((e) => {
                        console.log('error', e);
                        this.modal.dismiss();
                    });
            }
        }
    }

    shareViaEmail() {
      this.socialSharing.canShareViaEmail().then((res) => {
        this.socialSharing.shareViaEmail(this.sharingUrl, this.emailSubject, this.recipent, null, null, null).then(() => {
          this.modal.dismiss();
        });
      }).catch((e) => {
        // Error!
      });
    }
    shareViaInstagram() {
        this.socialSharing.canShareVia('instagram', this.sharingText, this.emailSubject, this.sharingImage)
            .then((res) => {
                this.socialSharing.shareViaInstagram(this.sharingText, 'assets/images/share/facebook.png');

            })
            .catch((e) => {
                // Error!
            });
    }
    copy()
    {
        //console.log(this.sharingUrl);
        this.clipboard.copy(this.sharingUrl);
        this.copiIcone = 'copied';
    }

}
