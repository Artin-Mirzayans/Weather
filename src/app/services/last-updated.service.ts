import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastUpdatedService {
  formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInMinutes < 60) {
      return `Just Updated`;
    } else if (diffInHours < 24) {
      const hours = String(Math.floor(diffInMinutes / 60)).padStart(2, '0');
      const minutes = String(diffInMinutes % 60).padStart(2, '0');
      return `Updated ${hours}:${minutes} hrs ago`;
    } else {
      return 'Outdated';
    }
  }
}
