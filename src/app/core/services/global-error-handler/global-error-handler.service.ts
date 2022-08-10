import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }
  handleError(error: any) {
    const chunkFailedMessage = /ChunkLoadError/;
    let errorMsg = '';
 
     if (chunkFailedMessage.test(error.message)) {
        errorMsg = `Erro! Falha ao carregar módulo! Recarregue a página e tente novamente.`;
        alert(errorMsg)
     } else {
        return error
     }
   }
}
