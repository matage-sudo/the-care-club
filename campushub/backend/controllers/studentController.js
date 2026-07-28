const pool = require("../config/db");

// GET all students
const getStudents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// GET one student
const getStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const createStudent = (req, res) => {
    res.json({ message: "Create student coming next!" });
};

const updateStudent = (req, res) => {
    res.json({ message: "Update student coming next!" });
};

const deleteStudent = (req, res) => {
    res.json({ message: "Delete student coming next!" });
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};