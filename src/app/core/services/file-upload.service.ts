import { Injectable } from '@angular/core';
import { FileUpload } from '../models/file-upload.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private keyUser;
  private rootDocuments = "DOCUMENTS_LIGUE/"
  private basePath = this.storageService.getCurrentSession().user.club.toUpperCase().replace("-", "").replace(" ", "_");

   constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private storageService: StorageService) { 
    this.keyUser = window["key_player"];
   }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.rootDocuments}/${this.basePath}"/"${this.keyUser}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    console.log("save file ---> ", this.keyUser);
    this.db.list(`${this.rootDocuments}/${this.basePath}/${this.keyUser}`).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(`${this.rootDocuments}/${this.basePath}/${this.keyUser}`, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(`${this.rootDocuments}/${this.basePath}/${this.keyUser}`).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(`${this.rootDocuments}/${this.basePath}/${this.keyUser}`);
    storageRef.child(name).delete();
  }
}
