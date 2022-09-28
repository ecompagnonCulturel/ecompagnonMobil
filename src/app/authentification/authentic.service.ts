import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Plugins} from '@capacitor/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './User.service';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {FormField} from '@app/formation/models/fomField';


const {Storage} = Plugins;

const TOKEN_KEY = 'my-token';
const user = 'currentUser';
const loginURL = '/api/login/etudiant';
const reSendURL = '/api/registration/resendMail';
const connectedURL = '/api/Connected';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),

};


@Injectable({
    providedIn: 'root'
})
export class AuthenticService {
    // Init with null to filter out the first value in a guard!
    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    token = '';
    currentUser = new BehaviorSubject<any>({
        idUsers: 0,
        nameUsers: '',
        mailUsers: '',
        CPUsers: '',
        firstname: '',
        lastname: '',
        formField: '',
        TokenNotific: ''
    });

    constructor(private httpClient: HttpClient,
                public route: ActivatedRoute,
                private authentificationService: UserService,
                private firebaseX: FirebaseX) {
        this.loadToken();
    }


    async loadToken() {
        const token = await Storage.get({key: TOKEN_KEY});
        /*Récupération de l'utilisateur stocké*/
        const util = await Storage.get({key: user});
        if (token && token.value) {
            // console.log('set token: ', token);
            this.token = token.value;
            this.isAuthenticated.next(true);
            this.currentUser.next(JSON.parse(util.value));

        } else {
            this.isAuthenticated.next(false);
        }
    }

    login(credentials: any): Observable<any> {

        return this.httpClient.post(`${environment.serverURL}` + loginURL, credentials, {...httpOptions, responseType: 'json'}).pipe(
            map((data: any) => {
                if (data != null) {
                    const userLog = {
                        nameUsers: data.nameUsers + ' ' + data.firstname,
                        mailUsers: data.mailUsers,
                        CPUsers: data.cpusers,
                        idUsers: data.idUsers,
                        firstname: data.firstname,
                        lastname: data.nameUsers,
                        formField: data.formField,
                        fcmToken: data.fcmToken
                    };
                    // Stockage de l'utilisateur connecté
                    Storage.set({key: user, value: JSON.stringify(userLog)});
                    this.getFcmToken(data.idUsers);
                    return data.token;
                }

            }),
            switchMap(token => {
                return from(Storage.set({key: TOKEN_KEY, value: JSON.stringify(token)}));

            }),
            tap(_ => {

                this.isAuthenticated.next(true);
            })
        );
    }

    logout2(): Promise<void> {
        this.isAuthenticated.next(false);
        this.currentUser.next(null);
        return Storage.remove({key: TOKEN_KEY});
    }

    reSendMail(mail: any) {

        return this.httpClient.post(`${environment.serverURL}` + reSendURL, mail, {...httpOptions, responseType: 'json'});

    }


    async getToken(): Promise<any> {
        const item = await Storage.get({key: TOKEN_KEY});
        return JSON.parse(item.value);
    }


    async setStorage(key: any, value: any): Promise<void> {
        await Storage.set({
            key,
            value
        });
        //  console.log(Storage.get({key: user}));
        this.loadToken();
        // console.log(Storage.get({key: user}));
    }

    getFcmToken(userId: any) {

        this.firebaseX.getToken()
            .then(token => {
                const updateToken: FormField = {id: userId, value: token};
                this.authentificationService.updateFcmToken(updateToken).subscribe(userTokenRec => {
                    },
                    err => {
                    });
            })
            .catch(error => console.error('Error getting token', error));


    }


}
