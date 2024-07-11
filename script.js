let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let contan = document.getElementById("alarms");
let tone = document.getElementById("tone");
let interVal;
let maxValue = 3;
let cnt = 0;
let almTimesArray = [];
function timeChangeFunction() {
	let curr = new Date();
	let hrs = curr.getHours();
	let min = String(curr.getMinutes()).padStart(2,"0");
	let sec = String(curr.getSeconds()).padStart(2,"0");
	let period = "pm";
	if (hrs <= 12) {
		period = "am";
		
	}
	hrs = String(hrs);
	time.textContent = `${hrs}:${min}:${sec} ${period}`;
}
function alarmSetFunction() {
	let now = new Date();
	let selectedDate = new Date(dateInput.value + "T" + tInput.value);
	
	if (cnt < maxValue) {
		let timeUntilAlarm = selectedDate - now;
		let alarmDiv = document.createElement("div");
		alarmDiv.classList.add("alarm");
		alarmDiv.innerHTML = `
			<span>
			${selectedDate.toLocaleString()}
			</span>
			<button class="delete-alarm">
			Delete
			</button>
		`;
		alarmDiv
			.querySelector(".delete-alarm")
			.addEventListener("click", () => {
				alarmDiv.remove();
				cnt--;
				clearTimeout(interVal);
				
			});
		interVal = setTimeout(() => {
			tone.innerHTML = `<audio src="./media/alarm-clock-short-6402.mp3" autoplay></audio>`;
			alarmDiv.remove();
			cnt--;
			
		}, timeUntilAlarm);
		contan.appendChild(alarmDiv);
		cnt++;
		almTimesArray.push(selectedDate.toString());
	}
}
function showAlarmFunction() {
	let alarms = contan.querySelectorAll(".alarm");
	alarms.forEach((alarm) => {
		let deleteButton = alarm.querySelector(".delete-alarm");
		deleteButton.addEventListener("click", () => {
			alarmDiv.remove();
			cnt--;
			clearTimeout(interVal);
			const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
			if (alarmIndex !== -1) {
				almTimesArray.splice(alarmIndex, 1);
			}
		});
	});
}
showAlarmFunction();
setInterval(timeChangeFunction, 1000);
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();