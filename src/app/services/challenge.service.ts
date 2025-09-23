import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly STORAGE_KEY_PREFIX = 'challengeData_';
  private currentChallengeId: string = '';

  setCurrentChallenge(challengeId: string) {
    this.currentChallengeId = challengeId;
  }

  getChallengeData(challengeId?: string) {
    const id = challengeId || this.currentChallengeId;
    const storageKey = `${this.STORAGE_KEY_PREFIX}${id}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : { 
      currentStreak: 0,
      longestStreak: 0,
      totalPoints: 0,
      completedDays: [],
      challengeCompleted: false,
      lastCompletedDate: null
    };
  }

  markDayAsCompleted(day: Date) {
    const storageKey = `${this.STORAGE_KEY_PREFIX}${this.currentChallengeId}`;
    const data = this.getChallengeData();
    const dayStr = day.toISOString().split('T')[0];
    
    if (!data.completedDays.includes(dayStr)) {
      const lastDate = data.lastCompletedDate ? new Date(data.lastCompletedDate) : null;
      const isConsecutive = lastDate ? 
        this.isConsecutiveDay(lastDate, day) : true;

      if (!isConsecutive) {
        data.currentStreak = 0;
      }

      data.completedDays.push(dayStr);
      data.currentStreak += 1;
      data.lastCompletedDate = dayStr;
      
      if (data.currentStreak > data.longestStreak) {
        data.longestStreak = data.currentStreak;
      }
      
      const requiredDays = this.currentChallengeId === 'walk-30-min-month' ? 30 : 15;
      if (data.currentStreak >= requiredDays) {
        data.totalPoints += 5;
        data.challengeCompleted = true;
      }
      
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
    return data;
  }

  private isConsecutiveDay(previous: Date, current: Date): boolean {
    const nextDay = new Date(previous);
    nextDay.setDate(nextDay.getDate() + 1);
    return current.toDateString() === nextDay.toDateString();
  }

  resetChallenge() {
    const storageKey = `${this.STORAGE_KEY_PREFIX}${this.currentChallengeId}`;
    const data = this.getChallengeData();
    data.currentStreak = 0;
    data.completedDays = [];
    data.challengeCompleted = false;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  }

  addPoints(points: number) {
    const storageKey = `${this.STORAGE_KEY_PREFIX}${this.currentChallengeId}`;
    const data = this.getChallengeData();
    data.totalPoints += points;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data.totalPoints;
  }

  getCurrentStreak(): number {
    const data = this.getChallengeData();
    return data.currentStreak;
  }

  getTotalPoints(): number {
    let total = 0;
    const challenges = [
      '15-days-no-sugar',
      'walk-30-min-month',
      '15-days-no-cigarettes-alcohol',
      '15-days-no-coffee-vitamin-c',
      'wake-up-at-5'
    ];
    for (const id of challenges) {
      const data = this.getChallengeData(id);
      total += data.totalPoints;
    }
    return total;
  }
}