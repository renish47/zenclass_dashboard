import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_STUDENT_INFO } from "../../utils/apiRoutes";
import axios from "axios";
import calculateDayDiff from "../../lib/calculateDayDiff";

const initialState = {
    firstName: "",
    id: "",
    lastName: "",
    courseDetails: {
        courseName: "",
        duration: "",
        syllabusLink: ""
    },
    batchDetails: {
        batchName: "",
        type: "",
        language: "",
        staffs: [],
        coordinators: []
    },
    tasks: [],
    projects: [],
    lessons: [],
    lessonsProgress: [],
    attendance: {
        totalNoOfClasses: 0,
        noOfClassesAttended: 0
    },
    studentActivity: {
        noOfLessons: 0,
        noOfLessonsCompleted: 0,
        noOfTasks: 0,
        noOfTasksCompleted: 0,
        totalProgress: null
    }
}

export const fetchStudentInfo = createAsyncThunk(
    "student/fetchInfo",
    async (studentId, thunkApi) => {
        const res = await axios.get(`${GET_STUDENT_INFO}/${studentId}`);
        return res.data.studentData;
    }
);

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        updateLocalTaskList: (state, action) => {
            state.tasks = state.tasks.map(task => {
                if (task._id === action.payload.taskId) {
                    task.answerLink = action.payload.answerLink
                    task.submittedOn = new Date()
                }
            })
        },
        updateLocalLessonProgressList: (state, action) => {
            let currentLesson = state.lessons.filter(lesson => lesson._id === action.payload.id)
            let noOfChapters = currentLesson[0].chapters.length
            state.lessonsProgress = state.lessonsProgress.map(data => {
                if (data.lessonId === action.payload.id) {
                    return {
                        ...data,
                        chaptersCompleted: [...data.chaptersCompleted, action.payload.chapDetail],
                        progress: Math.round(((data.chaptersCompleted.length + 1) / noOfChapters) * 100)
                    }
                }
                return data
            })
        },
        updateLocalProjectList: (state, action) => {
            state.projects = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudentInfo.fulfilled, (state, action) => {
            const student = action.payload
            state.firstName = student.firstName
            state.id = student._id
            state.lastName = student.lastName
            state.attendance = student.attendance
            state.batchDetails = student.batchId
            state.courseDetails = student.courseId
            state.projects = student.projects
            state.lessons = student.courseId.lessonList
            state.lessonsProgress = student.lessonsProgress
            if (student.tasks.length) {

                let temp = student.tasks.map((task, i) => {

                    let dueIn = calculateDayDiff(task.taskId.dueDate.toString())
                    if (i === 1) {
                        dueIn = calculateDayDiff(new Date())
                    }
                    return {
                        ...task.taskId,
                        dueIn,
                        answerLink: task.answerLink,
                        grade: task.grade,
                        submittedOn: task?.submittedOn
                    }
                })
                state.tasks = temp.sort((a, b) => a.dueIn - b.dueIn)
            }
            let noOfLessons = 0;
            let noOfLessonsCompleted = 0;
            let noOfTasks = student.tasks.length;
            let noOfTasksCompleted = 0;

            student.courseId.lessonList.forEach(lesson => {
                noOfLessons += lesson.chapters.length
            });
            student.lessonsProgress.forEach(lesson => {
                noOfLessonsCompleted += lesson.chaptersCompleted.length
            })

            student.tasks.forEach(task => {
                if (task.answerLink !== "")
                    noOfTasksCompleted += 1
            })
            let totalProgress = Math.round((((noOfLessonsCompleted / noOfLessons) + (noOfTasksCompleted / noOfTasks)) / 2) * 100)
            state.studentActivity = {
                noOfLessons,
                noOfLessonsCompleted,
                noOfTasks,
                noOfTasksCompleted,
                totalProgress
            }

        })
    }
})

export const { updateLocalTaskList, updateLocalLessonProgressList, updateLocalProjectList } = studentSlice.actions