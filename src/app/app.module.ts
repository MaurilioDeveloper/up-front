import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ImageViewerComponent, ImageViewerModule } from 'ng2-image-viewer';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolicitacaoComponent } from './componentes/aprovacao/solicitacao.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { LoadingModule } from './modules/loading/loading.module';
import { SolicitacaoService } from './services/solicitacao.service';
import { YesOrNoDialogComponent } from './shared/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { BrasilDateAdapter } from './util/BrasilDateAdapter';
import { NumberDirective } from './directive/only-number.directive';
import { SafePipe } from './pipe/safe.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SolicitacaoComponent,
    HeaderComponent,
    YesOrNoDialogComponent,
    LoginComponent,
    NumberDirective,
    SafePipe
  ],
  entryComponents: [ImageViewerComponent, YesOrNoDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    StorageServiceModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    ImageViewerModule,
    LoadingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {
    provide: DateAdapter, useClass: BrasilDateAdapter
    },
    SolicitacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
