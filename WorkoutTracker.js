export default class WorkoutTracker {
    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

        this.loadEntries();
        this.updateView();

        this.root.querySelector(".tracker-add").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDay().toString().padStart(2, "0");
        
            this.addEntry({
                date: `${year}-${month}-${day}`,
                workout: "",
                duration: 0
            });
        })
    }

    static html() {
        return `
            <table class="workout-tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="entries"></tbody>
                <tbody>
                    <tr class="tracker-row tracker-row-add">
                        <td colspan="4">
                            <button class="tracker-add">Add New Entry &plus;</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    
    }

    static rowHtml() {
        return `
        <tr class="tracker-row">
        <td>
            <input type="date" class="tracker-date">
        </td>
        <td>
            <select class="workout-types">
                <option value="jogging">Jogging</option>
                <option value="walking">Walking</option>
                <option value="basketball">Basketball</option>
                <option value="weight-training">Weight Training</option>
                <option value="yoga">Yoga</option>
                <option value="golf">Golf</option>
            </select>
        </td>
        <td>
            <input type="number" class="track-duration">
            <span class="track-text">minutes</span>
        </td>
        <td>
            <button type="button" class="track-button">&times;</button>
        </td>
    </tr>
        `
    }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem("workout-tracker-entries") || "[]");
    }

    saveEntries() {
        localStorage.setItem("workout-tracker-entries", JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".entries");
        const addRow = data => {    
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;


// Saves the changes made to the input data

            row.querySelector(".tracker-date").value = data.date;
            row.querySelector(".workout-types").value = data.workout;
            row.querySelector(".track-duration").value = data.duration;

            row.querySelector(".tracker-date").addEventListener("change", ({target}) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".workout-types").addEventListener("change", ({target}) => {
                data.workout = target.value;
                this.saveEntries();
            });

            row.querySelector(".track-duration").addEventListener("change", ({target}) => {
                data.duration = target.value;
                this.saveEntries();
            });

            row.querySelector(".track-button").addEventListener("click", () => {
                this.deleteEntry(data);
            })

            tableBody.appendChild(row);
    };

        tableBody.querySelectorAll(".tracker-row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }
    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);  //filters keeps all the data, unless it is the data to be deleted
        this.saveEntries();
        this.updateView();
    }
}


