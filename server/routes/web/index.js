module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    // const Article = require('../../models/Article')
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ["3月17日净化游戏环境声明及处罚公告", "3月16日体验服停机更新公告", "老亚瑟的答疑时间：貂蝉-仲夏夜之梦海报优化计划，王昭君-凤凰于飞优化海报过程稿", "第三届王者荣耀全国大赛赛事日历公布", "嫦娥皮肤设计大赛最终投票开启公告", "狄某有话说｜姜子牙化身“象棋高手”？", "小金金邀你来快手，抽史诗级皮肤", "老亚瑟的答疑时间：貂蝉-仲夏夜之梦海报优化计划，王昭君-凤凰于飞优化海报过程稿", "嫦娥皮肤设计大赛人气创意奖、优秀创意奖公布", "超丰厚奖励等你赢！第三届王者荣耀全国大赛北京海选首站（北京丰科万达站）即将开赛！", "第三届王者荣耀全国大赛——安徽省再次启航！", "3月19日体验服停机更新公告", "第三届王者荣耀全国大赛赛事日历公布", "3月17日外挂专项打击公告", "3月17日“演员”惩罚名单", "3月17日净化游戏环境声明及处罚公告", "3月16日体验服停机更新公告", "3月16日账号注销流程变更说明", "3月16日全服不停机更新公告", "春和景明柳垂莺娇，峡谷好礼随春报到", "【心动纸飞机】活动公告", "三月白情恰花开，峡谷好礼携春来", "【峡谷女神的细节考验】活动公告", "女神节来三月春，峡谷好礼迎春来", "元宵佳节至，峡谷迎春来", "新春暖意正融融，多重福利享不停", "【微信用户专属】微信小程序游戏礼品站购买兰陵王、花木兰“默契交锋”皮肤抽免单活动", "第三届王者荣耀全国大赛赛事日历公布", "第三届王者荣耀全国大赛——安徽省再次启航！", "第三届王者荣耀全国大赛城市赛道——第一期海选赛赛点信息", "2021年KPL春季赛季前赛今日开赛！重磅转会选手，新战场首秀来袭！", "K甲春季赛线下售票规则", "2021年K甲春季赛季前赛3月4日12:00开启售票，全新主场，为更强喝彩！", "KPL春季赛季前赛对阵公布，3月11日起每天8场比赛等你来看！", "2021K甲春季赛赛事日历与季前赛赛程公布"]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        // res.send(parent)
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门')
                 ? news.categories[0].name : cat.name
                return news
            })
        })
        res.send(cats)
    })
    app.use('/web/api', router)
}