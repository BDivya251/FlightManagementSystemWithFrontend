import { Component, OnInit,PLATFORM_ID ,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-discord-login',
  standalone: true,
  template: `<p>Logging in with Discord...</p>`
})
export class DiscordLoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log("discord login component loaded");
     if (!isPlatformBrowser(this.platformId)) {
      return; // stop execution on server
    }
    const code = this.route.snapshot.queryParamMap.get('code');
console.log('Code from URL:', code);
    if (!code) {
      console.error('No Discord code');
      return;
    }
    //  if (sessionStorage.getItem('discord_used')) return;

  sessionStorage.setItem('discord_used', 'true');
    console.log("calling backend")
    this.authService.discordLogin(code).subscribe({
      next: (res: any) => {
        console.log(res);
        if(typeof window!=='undefined'){
    localStorage.setItem('auth-token', res.token);
    localStorage.setItem('email', res.email);
    localStorage.setItem('username', res.username);
     this.router.navigate(['/user']);
        }
   
  },
  error: () => {
    console.error('Discord login failed');
  }
    });
  }
}
