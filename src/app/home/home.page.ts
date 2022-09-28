import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from '../formation/questionnaire/questionnaire.service';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';

// import { JwtHelperService } from '@auth0/angular-jwt';
import {UserService} from '../authentification/User.service';
import {AlertController, LoadingController, MenuController} from '@ionic/angular';
import {AuthenticService} from '../authentification/authentic.service';
import {Router} from '@angular/router';
import {FavorisService} from '../formation/favoris/favoris.service';
import {ResourceAPIService} from '../formation/resource/resource-api.service';
import {SessionService} from '../formation/session/session.service';
import * as moment from 'moment';
import {UtilService} from '../util/util.service';
import {forEach} from 'lodash';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    user: string | null;
    message: string | null = null;
    currentUser: any;
    TotalFavoris: any = 0;
    TotalResource: any = 0;
    TotalQuestionnaire: any = 0;
    currentSession: any;
    today: any;
    questionnaire: any;
    questionnaireT2: any;
    groups: any;
    fcmToken: any;


    constructor(private readonly authentificationService: UserService,
                // jwtHelper: JwtHelperService,
                private readonly httpClient: HttpClient,
                private menuCtrl: MenuController,
                private authenticService: AuthenticService,
                private router: Router,
                private favorisService: FavorisService,
                private api: ResourceAPIService,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private questionnaireService: QuestionnaireService,
                private sessionService: SessionService,
                private utilService: UtilService,
                private firebaseX: FirebaseX
    ) {

    }

    ngOnInit(): void {
        this.getAllResources();
        this.getCurrentSession();
        this.fcmReceivMessage();

 }

    ionViewWillEnter(): void {
        this.getAllResources();
        this.getCurrentSession();
    }

    ionViewDidEnter(): void {
        this.getAllResources();
        this.getCurrentSession();
    }

    logout1(): void {
        this.authentificationService.logout();
    }

    openProfileMenu() {
        this.menuCtrl.toggle();
    }

    async logout() {
        await this.authenticService.logout2();
        this.router.navigateByUrl('login', {replaceUrl: true});
        // this.router.navigate(['/'], { relativeTo: this.activeRoute.parent });
    }


    getCurrentUser(session: any) {
        this.authenticService.loadToken();
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            if (user != null) {
                //console.log(user);
                this.currentUser = user;
                this.getAllFavoris(user.idUsers);
                this.getUserByCP(user.CPUsers, session);

            }

        });
    }


    getFcmToken() {
       this.firebaseX.getToken()
            .then(token => {
                this.fcmToken = token;
            })
            .catch(error => console.error('Error getting token', error));

       return this.fcmToken;
    }

    getAllFavoris(id: any) {
        this.favorisService.getFavorisByUser(id)
            .subscribe(data => {
                // console.log(data.length);
                this.TotalFavoris = data.length;

            });
    }




fcmReceivMessage()
{
   this.firebaseX.onMessageReceived()
      .subscribe(data => {
          if (data.containsKey('notification_foreground')) {
              data.foreground = true;
            //  console.log("notification_foreground");
          }
          else{
            //  console.log("notification_backgroud");

          }



      });
}


    async getAllResources() {
       const loading = await this.loadingController.create({
            message: 'Loading...'
        });
       await loading.present();
       await this.api.getAllResources()
            .subscribe(res => {

                this.TotalResource = res.length;
                // console.log(res);

                loading.dismiss();
            }, err => {
                // console.log(err);
                loading.dismiss();
            });
    }

    getCurrentForm(user: any, session: any) {
        // console.log(user);
        this.today = moment().format();
        if ((user.formField === null)) {
            this.TotalQuestionnaire = 1;
        } else {
            if (this.currentSession !== null) {   // Recherche des aquestionnaire du jour du groupe de l'étudiant
                this.questionnaireService
                    .getQuestionnnaireByDateSessionEtudiant(this.today, this.today, session.id, this.currentUser.CPUsers)
                    .subscribe(questAll => {
                            // Si il y a un questionnaire en cours
                            if (questAll != null && questAll.length > 0) {

                                const currentQuestionnaire = {
                                    id: questAll[0].questionnaire.id,
                                    value: questAll[0].questionnaire.type
                                };
                                //   vérification des questionnaires déjà remplis par l'étudiant
                                if (this.utilService.ObjectExist(user.formField, currentQuestionnaire) === false) {
                                    this.TotalQuestionnaire = 1;
                                    this.questionnaire = questAll;

                                } else {
                                    this.T2(user);
                                    this.questionnaire = null;

                                }

                            } else {
                                this.T2(user);
                                this.questionnaire = null;

                            }
                        },
                        err => {
                            this.TotalQuestionnaire = 0;
                            this.questionnaire = null;
                        });

            } else {
                this.TotalQuestionnaire = 0;
                this.questionnaire = null;
            }


        }

        this.notificationSubscription(this.currentSession.id, this.currentUser.CPUsers);

    }

    T2(user: any) {

        this.questionnaireService.getByQuestionnaireTypeAndDate('T2', this.today, this.today)
            .subscribe(questT2 => {
                    //  console.log(questT2);
                    if (questT2 != null && questT2.length > 0) {
                        const currentQuestionnaire = {
                            id: questT2[0].questionnaire.id,
                            value: questT2[0].questionnaire.type
                        };
                        //   vérification des questionnaires déjà remplis par l'étudiant
                        if (this.utilService.ObjectExist(user.formField, currentQuestionnaire) === false) {
                            this.TotalQuestionnaire = 1;
                            this.questionnaireT2 = questT2;
                        } else {
                            this.TotalQuestionnaire = 0;
                            this.questionnaireT2 = null;
                        }


                    } else {
                        this.TotalQuestionnaire = 0;
                        this.questionnaireT2 = null;

                    }
                },
                err => {
                    this.TotalQuestionnaire = 0;


                });
    }

    getCurrentSession() {
        this.sessionService.getActiveSession().subscribe(session => {
            // console.log(session);
            if (session) {
                this.currentSession = session;
                this.getCurrentUser(session);
            }
        }, err => {

        });

    }

    getUserByCP(CP: any, session: any) {
        this.authentificationService.getUserByCP(CP)
            .subscribe(user => {
               // console.log(user);
                if (user) {
                    if ((user.fcmToken === undefined) || (user.fcmToken == null)) {
                        const fcmToken = this.getFcmToken();
                        if (fcmToken != null) {
                            const userToken = {
                                id: user.idUsers,
                                value: fcmToken
                            };
                           // console.log(userToken);

                            this.authentificationService.updateFcmToken(userToken).subscribe(userTokenRec => {


                                    },
                                err => {});

                        }

                    }
                }
                this.getCurrentForm(user, session);
            }, err => {});
    }

    notificationSubscription(session: any, CP: any) {
        // Groupe notification T11,T12
        this.questionnaireService.getByGroupeEtudiantBySessionAndEtudiantList(session, CP)
            .subscribe(groups => {
                if (groups) {
                    this.groups = groups;
                    groups.forEach(group =>
                    {
                       // console.log(group)
                        this.firebaseX.subscribe('GS-' + group.groupEtudiant.id + '-' + session);
                    });
                }
            }, err => {

            });
        // Session Notication for T0 et T2
        this.firebaseX.subscribe('S' + '-' + session);


        // Notification finissant
        this.authentificationService.verifyFinishUser(CP)
            .subscribe(data => {
                if (data)
                {
                    this.firebaseX.subscribe('F-T3');
                   // console.log('notification T3');
                }

            });

    }

}
