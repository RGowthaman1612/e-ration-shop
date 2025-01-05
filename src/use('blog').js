use('blog')
temp = db.getCollection('temp')
// db.temp.findAndModify({
//     query:{runtime:{$gte:95}},
//     sort:{year:1},
//     update:{$inc:{runtime:3}},
// })

// db.temp.findAndModify({
//     query:{name:"ranjith"},
//     remove:true
// })

// db.temp.findAndModify({
//     query:{name:"Gowthaman"},
//     update:{roll:"developer"}
// })

// db.temp.findAndModify({
//     query:{roll:"developer"},
//     update:{$set:{name:"Gowthaman",dob:"16-12-2003"}},
//     new:true
// })
// db.temp.findAndModify({
//     query:{runtime:{$gte:50}},
//     update:{$set:{omle:"yes"}},
//     new:true,
//     fields:{released:{$date:0}}
// })

// db.temp.findAndModify({
//     query:{omle:1},
//     update:{$set:{omle:2}},
//     new:true,  
//     writeConcern:{
//         w:1,
//         j:true,
//         wtimeout:10000
//     }
// })

// db.temp.findAndModify({
//     query:{omle:2},
//     update:{$set:{omle:3}},
//     new:true,  
//     writeConcern:{
//         w:1,
//         j:true,
//         wtimeout:10000
//     },
// })
// db.temp.findAndModify({
//     query:{omle:2},
//     update:{$set:{omle:3}},
//     new:true,  
//     writeConcern:{
//         w:1,
//         j:true,
//         wtimeout:10000
//     },
//     arrayFilters:[
//         {$or:[{"imdb.rating":{$gte:5}}]},

//     ]
// })

// db.createUser(
//     {
//       user: "Gowthaman",
//       pwd:  passwordPrompt(),   // or cleartext password
//       roles: [ { role: "readWrite", db: "blog" },
//                { role: "read", db: "local" } ]
//     }
//   )
use('sample_mflix')
// db.movies.createIndex(
//     {
//         name:"text"
//     },
//     {
//         weights:{name:5}
//     }
// )
// db.movies.dropIndex("SRG")

// db.movies.find(
//     {$text:{$search:"Cabin in the Sky"}},
//     {score:{$meta:"textScore"}}
//     ).sort( { score: { $meta: "textScore" } } )
// db.movies.createIndex({"imdb.$**":1})
// db.movies.createIndex({"$**":1})
// // db.movies.getIndexes()
// db.movies.findAndModify({
//     query:{runtime:{$gte:25}}

// })

// db.movies.find({runtime:{$gte:50},year:1943}).explain("executionStats")
// db.movies.getIndexes()
use("sample_restaurants")
// db.restaurants.explain("executionStats").aggregate([
//     // {
//     //   $match:
//     //     /**
//     //      * query: The query in MQL.
//     //      */
//     //     {
//     //       _id: ObjectId("5eb3d668b31de5d588f42930")
//     //     }
//     // }
//     {
//       $project:
//         /**
//          * specifications: The fields to
//          *   include or exclude.
//          */
//         {
//           _id: 1,
//           cuisine: 1,
//           grades: 1
//         }
//     },
//     {
//       $match:
//         /**
//          * query: The query in MQL.
//          */
//         {
//           cuisine: {
//             $in: ["Greek", "American", "Indian"]
//           }
//         }
//     },
//     {
//       $match:
//         /**
//          * query: The query in MQL.
//          */
//         {
//           grades: {
//             $all: [
//               {
//                 $elemMatch: {
//                   grade: "A"
//                 }
//               }
//             ]
//           }
//         }
//     }
//   ])
// db.restaurants.createIndex({"grades.grade":1},{partialFilterExpression:{"grades.grade":{$gte:"C"}}})
// db.restaurants.createIndex({"grades.grade":1})
// db.restaurants.dropIndex("grades.grade_1")
// db.restaurants.getIndexes()
// db.restaurants.find({grades:{$elemMatch:{grade:{$gte:"A"}}}}).explain("executionStats")
// db.restaurants.findAndModify({
//     query:{"grades.score":{$gte:80}},
//     update:{$set:{"grades.$[elem].grade":"b"}},
//     arrayFilters:[{"elem.grades":{$in:["B","C"]}}]
// })
// db.restaurants.updateMany(
//     {"grades.score":{$gte:80}},
//     {$set:{"grades.$[elem].grade":"b"}},
//     {arrayFilters:[{"elem.grades":{$in:["B","C"]}}]}
// )
db.restaurants.updateMany(
    {
        "grades.score": { $gte: 80 },
    },
    {
        $set: { "insertedBy": "Gowthaman", "grades.$[elem].grade": "b" }
    },
    {
        arrayFilters: [{ "elem.grade": { $in: ["B", "C"] } }]
    }
);
