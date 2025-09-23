import { Component } from '@angular/core';
import { NewUser } from '../models/user.model';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page  {
  NewUsers: NewUser[] = [
    {
      id: 1,
      name: 'Emna Charmi',
      role: 'Etudiante',
      profileImage: '../../assets/icon/moi.jpg',
      isFollowing: false,
      isLiked: false
    },
    {
      id: 2,
      name: 'Jean Dupont',
      role: 'Développeur',
      profileImage: '../../assets/icon/user2.jpg',
      isFollowing: false,
      isLiked: false
    },
    {
      id: 3,
      name: 'Marie Martin',
      role: 'Designer',
      profileImage: '../../assets/icon/user3.jpg',
      isFollowing: false,
      isLiked: false
    }
  ];

  toggleFollow(nuser: NewUser) {
    nuser.isFollowing = !nuser.isFollowing;
  }

  toggleLike(nuser: NewUser) {
    nuser.isLiked = !nuser.isLiked;
  }

  getFollowImage(nuser: NewUser): string {
    return nuser.isFollowing 
      ? '../../assets/icon/accepter.png' 
      : '../../assets/icon/suivre.png';
  }

  getLikeImage(nuser: NewUser): string {
    return nuser.isLiked
      ? '../../assets/icon/fullhea.png'
      : '../../assets/icon/heart.svg';
  }
}

