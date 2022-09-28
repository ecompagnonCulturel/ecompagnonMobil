import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticService  } from '../../authentification/authentic.service';
import { CommentService } from './comment.service';
import {LoadingController, ModalController} from '@ionic/angular';
import { SessionService } from '../session/session.service';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';
import 'moment/locale/pt-br';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  comment: any[];
  currentUser: any;
  currentSession: any;
  constructor(private commentService: CommentService,
              private readonly httpClient: HttpClient,
              private modalController: ModalController,
              // private socialSharing:SocialSharing
              private authenticService: AuthenticService,
              private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private sessionService: SessionService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getCurrentSession();
  }

  /*async getAllComment()
  {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.commentService.getAllComment()
        .subscribe(comm => {
                 this.comment = comm;
                 loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
  }*/

  /*async AddComment() {
    const comment = {
      commentUser:  this.currentUser.idUsers,
      session: this.currentSession.sessNom,
      commentDate: new Date(),
      //commentDesc: commentDesc,
      commentStatut: 1
    };

    this.commentService.addComment(comment)
        .subscribe(comm => {
              console.log(comm.id);

            },
            err => {
              console.log(err);

            }) ;

  }*/

  async AddComment(idRessource: any) {
    const alert = await this.alertController.create({
      cssClass: 'comment',
      header: 'Nouveau commentaire',
      // subHeader: 'Enlever cette ressource des favoris?',
      // message: 'Enlever cette ressource des favoris?',
      inputs: [
        {
          name: 'commentDes',
          type: 'textarea',
          attributes: {
            rows: 2

          }


        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: (data: any) => {
            //console.log('Canceled', data);
          }
        },
        {
          text: 'OK',
          handler: (data: any) => {
            const comment = {
              commentUser:  this.currentUser.idUsers,
              commentRessource: idRessource,
              session: this.currentSession.sessNom,
              commentDate:  moment().locale('en'),
              commentDesc: data.commentDes,
              commentStatut: 1
            };

            this.commentService.addComment(comment)
                .subscribe(comm => {
                      console.log(comm.id);

                    },
                    err => {
                      console.log(err);

                    }) ;

          }
        }
      ]
    });
    await alert.present();
  }
  async updateComment(comment: any) {
    this.commentService.addComment(comment)
        .subscribe(comm => {
              console.log(comm.id);

            },
            err => {
              console.log(err);

            }) ;
  }

  async deleteComment(idcomment: any) {
    this.commentService.deleteComment(idcomment)
        .subscribe(comm => {
              console.log(comm.id);

            },
            err => {
              console.log(err);

            }) ;
  }

  getCurrentUser()
  {
    const User = (this.authenticService.currentUser).asObservable();
    User.subscribe(user => {
      this.currentUser = user[0];
      // this.api.CpEtudiant=this.currentUser.CPUsers;
    });
  }

  async  getCurrentSession()
  {

    const Session = (this.sessionService.Currentsession).asObservable();
    // console.log(Session);
    Session.subscribe(session => {
      console.log(session);
      if (session)
      {
        this.currentSession = session;

      }


    });

  }
}
