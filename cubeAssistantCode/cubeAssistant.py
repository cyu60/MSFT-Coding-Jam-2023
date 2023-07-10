from m5stack import *
from m5ui import *
from uiflow import *
import imu

setScreenColor(0x111111)

imu0 = imu.IMU()
Activity = M5TextBox(0, 100, "", lcd.FONT_DejaVu56, 0xFFFFFF, rotate=0)
# Activity.setWidth(320)  # Set the width of the M5TextBox to the screen width
Timer = M5TextBox(100, 200, "", lcd.FONT_DejaVu40, 0xFFFFFF, rotate=0)
# Timer.setWidth(320)  # Set the width of the M5TextBox to the screen width

labels = [
    M5TextBox(135, 152, "Z", lcd.FONT_DejaVu18, 0xFFFFFF, rotate=0),
    M5TextBox(168, 126, "Z", lcd.FONT_DejaVu24, 0xFFFFFF, rotate=0),
    M5TextBox(204, 94, "Z", lcd.FONT_DejaVu40, 0xFFFFFF, rotate=0),
    M5TextBox(245, 56, "Z", lcd.FONT_DejaVu56, 0xFFFFFF, rotate=0)
]

current_side = None
timer_start = None

while True:
    magX = imu0.acceleration[0]
    magY = imu0.acceleration[1]
    magZ = imu0.acceleration[2]

    max_mag = max(abs(magX), abs(magY), abs(magZ))

    side_up = ""
    color = 0xFFFFFF  # Default color for unknown activities

    if max_mag == abs(magX):
        if magX > 0:
            side_up = "Reading"
            color = 0x00FF00  # Green color for "Reading"
            Activity.setRotate(90)
            Activity.setPosition(x=200, y=0)  # Set position for rotated text
            Timer.setRotate(90)
            Timer.setPosition(100, 100)  # Set position for rotated text
        else:
            side_up = "Coding"
            color = 0x0000FF  # Red color for "Writing"
            Activity.setRotate(270)
            Activity.setPosition(100, 184)  # Set position for rotated text
            Timer.setRotate(270)
            Timer.setPosition(200, 200)  # Set position for rotated text

    if max_mag == abs(magY):
        if magY > 0:
            side_up = "Writing"
            color = 0xFF00FF  # Blue color for "Coding/Programming"
            Activity.setRotate(0)
            Activity.setPosition(0, 100)  # Set position for non-rotated text
            Timer.setRotate(0)
            Timer.setPosition(100, 200)  # Set position for non-rotated text
            # Activity.setRotate(90)
            # Activity.setPosition(0, 100)  # Set position for rotated text
            # Timer.setRotate(90)
            # Timer.setPosition(0, 200)  # Set position for rotated text
        else:
            side_up = "Research"
            color = 0xFFFF00  # Yellow color for "Drawing/Creative Work"
            Activity.setRotate(180)
            Activity.setPosition(272, 150)  # Set position for rotated text
            Timer.setRotate(180)
            Timer.setPosition(272, 50)  # Set position for rotated text

    if max_mag == abs(magZ) and magZ > 0:
        Activity.setText("")
        # Activity.setText("")
        for label in labels:
            label.setText("Z")

    else:
        for label in labels:
            label.setText("")
        # side_up = "Off/Break"
        # color = 0x808080  # Gray color for "Off/Break"
        # Activity.setRotate(0)
        # Activity.setPosition(0, 100)  # Set position for non-rotated text
        # Timer.setRotate(0)
        # Timer.setPosition(100, 200)  # Set position for non-rotated text

    if current_side != side_up:
        current_side = side_up
        timer_start = time.ticks_ms() // 1000

    Activity.setText(side_up)
    Activity.setColor(color)

    if timer_start is not None:
        elapsed_time = time.ticks_diff(time.ticks_ms() // 1000, timer_start)
        minutes = elapsed_time // 60 + 24
        seconds = elapsed_time % 60
        Timer.setText("{:02d}:{:02d}".format(minutes, seconds))

    wait_ms(300)
