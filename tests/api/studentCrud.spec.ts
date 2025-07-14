import { test, expect } from '@playwright/test'

import mockApiStudent from '../../utils/mock-data/mockApiStudent.json'
import mockUpdatedApiStudent from '../../utils/mock-data/mockUpdatedApiStudent.json'

test.describe.serial('API Automation - CRUD methods for a student', () => {
    let studentID: number;

    test('TASK-1: Get All Students', async ({ request }) => {
       const response = await request.get(process.env.apiURL!)

        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.length).toBeGreaterThan(1)

        body.forEach((value) => {
            expect(value.STUDENT_ID).toBeDefined()
        })
    })

    test('Task-2: Create a user', async ({ request }) => {
        const response = await request.post(process.env.apiURL!, {
            data: mockApiStudent
        })
        expect(response.status()).toBe(201)
        
        const body = await response.json()
        for (const key in mockApiStudent) {
            expect(body[key]).toBe(mockApiStudent[key]);
          }
          expect(body.STUDENT_ID).toBeGreaterThan(2);
          studentID = body.STUDENT_ID
    })

    test('Task 3 - Get Newly Created Student', async ({ request }) => {
        const response = await request.get(`${process.env.apiURL}/${studentID}`)
        expect(response.status()).toBe(200)
        const body = await response.json()

        for(const key in mockApiStudent) {
            expect(body.DOB.slice(0, 10)).toBe(mockApiStudent.DOB)
        }
    })
    test('Task 4', async ({ request }) => {
        const response = await request.put(`${process.env.apiURL}/${studentID}`, {
            data: mockUpdatedApiStudent
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.message).toBe(`Successfully updated the student with the STUDENT_ID: ${studentID}`)
    })

    test('Task 5', async ({ request }) => {
        await request.delete(`${process.env.apiURL}/${studentID}`)
    })
})