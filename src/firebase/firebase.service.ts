import * as admin from 'firebase-admin'
import * as serviceAccount from './firebase-config.json'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirebaseService {
    private firebaseApp: admin.app.App;

    constructor() {
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
    }

    async verifyToken(token: string) {
        return admin.auth().verifyIdToken(token);
    }
}