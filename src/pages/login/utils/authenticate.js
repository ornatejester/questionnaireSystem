// class Managerment
import MajorClass from "../../../components/classMangerment/majorClass";
import MemberLecture from "../../../components/classMangerment/memberLecture";
import LectureDetail from "../../../components/classMangerment/components/letureDetail";
// member Managerment
import MemberFile from "../../../components/memberManagerment/memberData";
import MemberThesis from "../../../components/memberManagerment/memberThesis";
import StuThesis from "../../../components/memberManagerment/stuThesis";
// team Managerment
import TeamFee from "../../../components/teamManagerment/teamFee";
import TeamProject from "../../../components/teamManagerment/teamProject";
import MemberFee from "../../../components/teamManagerment/memberFee";
import MemberProject from "../../../components/teamManagerment/memberProject";
// system Managerment
import SystemIndex from "../../../components/systemManagerment/systemIndex";
import PersonalCenter from "../../../components/systemManagerment/personalCenter";
const studentMenu = [
    {
        subMenuName:"menu1",
        list:[
            {
                route:"/home/systemIndex",
                component:SystemIndex,
                icon:"tablet",
                name:"menu1_func1"
            },
            {
                route:"/home/personalCenter",
                component:PersonalCenter,
                icon:"tablet",
                name:"menu1_func2"
            },
        ]
    },
    {
        subMenuName:"menu2",
        list:[
            {
                route:"/home/memberThesis",
                component:StuThesis,
                icon:"tablet",
                name:"menu2_func2"
            },
        ]
    },
    {
        subMenuName:"menu3",
        list:[
            {
                route:"/home/memberLecture",
                component:LectureDetail,
                icon:"tablet",
                name:"menu3_func1"
            },
            {
                route:"/home/majorClass",
                component:MajorClass,
                icon:"tablet",
                name:"menu3_func2"
            },
        ]
    },
    {
        subMenuName:"menu4",
        list:[
            {
                route:"/home/memberFee",
                component:MemberFee,
                icon:"tablet",
                name:"menu4_func3"
            },
            {
                route:"/home/memberProject",
                component:MemberProject,
                icon:"tablet",
                name:"menu4_func4"
            },
        ]
    },
]
const teacherMenu = [
    {
        subMenuName:"menu1",
        list:[
            {
                route:"/home/systemIndex",
                component:SystemIndex,
                icon:"tablet",
                name:"menu1_func1"
            },
        ]
    },
    {
        subMenuName:"menu2",
        list:[
            {
                route:"/home/memberFile",
                component:MemberFile,
                icon:"tablet",
                name:"menu2_func1"
            },
            {
                route:"/home/memberThesis",
                component:MemberThesis,
                icon:"tablet",
                name:"menu2_func2"
            },
        ]
    },
    {
        subMenuName:"menu3",
        list:[
            {
                route:"/home/memberLecture",
                component:MemberLecture,
                icon:"tablet",
                name:"menu3_func1"
            },
            {
                route:"/home/majorClass",
                component:MajorClass,
                icon:"tablet",
                name:"menu3_func2"
            },
        ]
    },
    {
        subMenuName:"menu4",
        list:[
            {
                route:"/home/teamFee",
                component:TeamFee,
                icon:"tablet",
                name:"menu4_func1"
            },
            {
                route:"/home/teamProject",
                component:TeamProject,
                icon:"tablet",
                name:"menu4_func2"
            },
        ]
    },
]

const menuConfig = [
    studentMenu,
    teacherMenu
]

export default menuConfig;