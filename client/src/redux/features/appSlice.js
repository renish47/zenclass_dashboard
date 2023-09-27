import { createSlice } from "@reduxjs/toolkit"
import store from "../store"

const initialState = {
    projectOpened: {
        projectId: "",
        projectNo: "",
        name: "",
        desc: "",
        githubLink: "",
        deployedLink: "",
        imageUrl: "",
        submittedOn: ""
    },
    chapterPlaying: "",
    taskOpened: {
        id: "",
        name: "",
        question: "",
        dueIn: "",
        submittedOn: "",
        answerLink: "",
        grade: "",
        dueIn: 0
    },
    lessonOpened: {
        id: "",
        name: "",
        moduleNo: 0,
        chapters: [],
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setProjectOpenedInfo: (state, action) => {
            let project = action.payload.projects.filter(project => project._id === action.payload.id)
            state.projectOpened = {
                name: project[0].projectName,
                desc: project[0].description,
                projectId: project[0]._id,
                projectNo: project[0].projectNo,
                githubLink: project[0].githubLink,
                deployedLink: project[0].deployedLink,
                imageUrl: project[0].imageUrl,
                submittedOn: project[0].submittedOn
            }
        },
        setTaskOpenedInfo: (state, action) => {
            let task = action.payload.tasks.filter(task => task._id === action.payload.id)
            state.taskOpened = {
                name: task[0].taskName,
                taskId: task[0]._id,
                taskNo: task[0].taskNo,
                question: task[0].question,
                dueIn: task[0].dueIn,
                answerLink: task[0].answerLink,
                grade: task[0].grade,
                submittedOn: task[0].submittedOn || ""
            }
        },
        setLessonOpenedInfo: (state, action) => {
            let lesson = action.payload.lessons.filter(lesson => lesson._id === action.payload.id)
            let currentLesson = action.payload.lessonsProgress.filter(
                (lesson) => lesson.lessonId === action.payload.id
            );
            let chaptersCompleted = [...currentLesson[0].chaptersCompleted]
            let chapList = [...lesson[0].chapters]
            chaptersCompleted.forEach(data => {
                chapList[data.chapterNo - 1] = Object.assign({}, chapList[data.chapterNo - 1], { isCompleted: true })
            })
            state.lessonOpened = {
                id: lesson[0]._id,
                name: lesson[0].lessonName,
                moduleNo: lesson[0].moduleNo,
                chapters: chapList
            }
            if (chaptersCompleted.length && currentLesson[0].progress < 100) {
                console.log("first")
                state.chapterPlaying = `${chaptersCompleted[chaptersCompleted.length - 1].chapterNo}. ${chapList[chaptersCompleted[chaptersCompleted.length - 1].chapterNo].chapterName}`
            }
        },
        setChapterPlaying: (state, action) => {
            state.chapterPlaying = action.payload
        },
        resetTaskOpened: (state) => {
            state.taskOpened = initialState.taskOpened
        },
        resetLessonOpened: (state) => {
            state.lessonOpened = initialState.lessonOpened
        },
        updateTaskOpenedInfo: (state, action) => {
            state.taskOpened.answerLink = action.payload.answerLink
            state.taskOpened.submittedOn = new Date()
        }
    }
})

export const { setProjectOpenedInfo, setChapterPlaying, setTaskOpenedInfo, resetTaskOpened, updateTaskOpenedInfo, setLessonOpenedInfo, resetLessonOpened } = appSlice.actions

export default appSlice