import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       // clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6', // Prod enviroment. Uncomment to use. 
//       clientId: '94e88e8e-0545-4618-8f5d-3fcd2a13856d', // PPE testing environment
//       authority: 'https://login.microsoftonline.com/9652d7c2-1ccf-4940-8151-4a92bd474ed0', // Prod environment. Uncomment to use.
//       //authority: 'https://login.windows-ppe.net/common', // PPE testing environment.
//       redirectUri: 'https://TRUCKS-eu-web-ReliabilityWeibullProd.azurewebsites.net/.auth/login/aad/callback',
//       postLogoutRedirectUri: '/'
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: false
//       }
//     }
//   });
// }

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  //protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);
  protectedResourceMap.set('https://ravitejapython.azurewebsites.net/home', ['api://7806939f-59cf-4622-8c63-c9b6cd60a324/user_impersonation']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return { 
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: ['user.read']
//     },
//     loginFailedRoute: '/login-failed'
//   };
// }

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '466f7921-37dc-4619-8e76-1f7694408564',
          authority: 'https://login.microsoftonline.com/b819f575-8b84-4bab-9f62-d6d3f09d03af',
          redirectUri: 'https://ravitejanodejs.azurewebsites.net',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ['api://7806939f-59cf-4622-8c63-c9b6cd60a324/user_impersonation'],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map<string, string[]>(),
        
        
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory
    // },
    // {
    //   provide: MSAL_GUARD_CONFIG,
    //   useFactory: MSALGuardConfigFactory
    // },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    //MsalGuard,
    //MsalBroadcastService
  ],
  //, MsalRedirectComponent
  bootstrap: [AppComponent]
})
export class AppModule { }

