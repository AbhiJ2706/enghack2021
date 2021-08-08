class AchievementsMonitor {
    constructor() {
        this.moneyAchievementConditions = [
            (money) => money > 10,
            (money) => money > 25,
            (money) => money > 50,
            (money) => money > 100,
            (money) => money > 200,
            (money) => money > 1000
        ]
        this.timeAchievementConditions = [
            (time) => Date.now() - time >= 86400000, //1 day
            (time) => Date.now() - time >= 172800000, //2 days
            (time) => Date.now() - time >= 604800000, //1 week
            (time) => Date.now() - time >= 2592000000, //1 month
            (time) => Date.now() - time >= 15552000000, //6 months
            (time) => Date.now() - time >= 311040000000, //1 year
        ]
        this.moneyAchievement = []
        this.timeAchievement = []
    }

    condWrapper(func, param, index, arr) {
        if (func(param)) {
            return arr[index]
        } else {
            return false
        }
    }

    checkMoneyAchievements(money) {
        for (var i = 0; i < this.moneyAchievement.length; ++i) {
            var x = condWrapper(this.moneyAchievementConditions[i], money, i, this.moneyAchievement)
            if (x) {

            }
        }
    }

    checkTimeAchievements(time) {
        for (var i = 0; i < this.timeAchievement.length; ++i) {
            var x = condWrapper(this.timeAchievementConditions[i], time, i, this.timeAchievement)
            if (x) {
                
            }
        }
    }
}