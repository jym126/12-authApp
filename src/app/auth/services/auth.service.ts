import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrls;
  
  //Esta parte es solo para capturar la informacion del usuario que viene con la respuesta y enviarla al dashboard
  private _usuario!: Usuario;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  //En la función login ademas de hacer la consulta a la base de datos aprovecho con un pipe para obtener mas información
  //Con el "tap" realizo un segundo uso tomando información del usuario para cumplimentar el dashboard
  //con el "map" obtengo el resultado de la respuesta del estado (true o false) si hay un error obtengo el mensaje de la respuesta
  //Esto ultimo es asi por que el subscribe no maneja bien los errores de pagina (400) ya le facilito la información desde aqui
  //para un mejor manejo de la funicon login en login.component y a la vez almaceno el token en el local storage.
  //NOTA: para obtener el token tuve que utilizar JSON.stringify() de lo contrario siempre daría "undefned" 
  //explicación: https://hashnode.com/post/localstorage-returning-undefined-ckajqts2q02vglns1ohw982xw
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth`, {email, password})
    .pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.nombre!,
            uid: resp.uid!,
            email: resp.email!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token')

    //Se revalida el token almacenado para que si el usuario recarga la pagina conserve los datos
    const headers = new HttpHeaders()
    .set('x-token', token || '');
    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/renew`, {headers})
    .pipe(
      map(resp => {
        localStorage.setItem('x-token', resp.token!);
        this._usuario = {
          nombre: resp.nombre!,
          uid: resp.uid!,
          email: resp.email!
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/new`, {nombre, email, password})
    .pipe(
      tap( ({ ok, token }) => {
        if ( ok ) {
          localStorage.setItem('token', token! );
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  logout() {
    localStorage.clear();
  }
}
