//Button Class
export default function Clickable({ x = 0, y = 0, p5instance }) {
    const p = p5instance

    this.x = x //X position of the clickable
    this.y = y //Y position of the clickable
    this.width = 100 //Width of the clickable
    this.height = 50 //Height of the clickable
    this.color = '#FFFFFF' //Background color of the clickable
    this.cornerRadius = 10 //Corner radius of the clickable
    this.strokeWeight = 2 //Stroke width of the clickable
    this.stroke = '#000000' //Border color of the clickable
    this.text = 'Press Me' //Text of the clickable
    this.textColor = '#000000' //Color for the text shown
    this.textSize = 12 //Size for the text shown
    this.textFont = 'sans-serif' //Font for the text shown
    this.textScaled = false //Scale the text with the size of the clickable

    // image options
    this.image = null // image object from p5loadimage()
    this.fitImage = false // when true, image will stretch to fill button
    this.imageScale = 1.0
    this.tint = null // tint image using color
    this.noTint = true // default to disable tinting
    this.filter = null // filter effect

    this.updateTextSize = function () {
        if (this.textScaled) {
            for (let i = this.height; i > 0; i--) {
                if (
                    getTextBounds(this.text, this.textFont, i)[0] <=
                        this.width &&
                    getTextBounds(this.text, this.textFont, i)[1] <= this.height
                ) {
                    console.log(
                        'textbounds: ' + getTextBounds(this.text, this.font, i)
                    )
                    console.log('boxsize: ' + this.width + ', ' + this.height)
                    this.textSize = i / 2
                    break
                }
            }
        }
    }
    this.updateTextSize()

    this.onHover = function () {
        //This function is ran when the clickable is hovered but not
        //pressed.
    }

    this.onOutside = function () {
        //This function is ran when the clickable is NOT hovered.
    }

    this.onPress = function () {
        //This function is ran when the clickable is pressed.
    }

    this.onRelease = function () {
        //This function is ran when the cursor was pressed and then
        //released inside the clickable. If it was pressed inside and
        //then released outside this won't run.
    }

    this.locate = function (x, y) {
        this.x = x
        this.y = y
    }

    this.resize = function (w, h) {
        this.width = w
        this.height = h
        this.updateTextSize()
    }

    this.drawImage = function () {
        p.push()
        p.imageMode(p.CENTER)
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let imgWidth = this.width
        let imgHeight = this.height
        if (this.fitImage) {
            let imageAspect = this.image.width / this.image.height
            let buttonAspect = this.width / this.height
            if (imageAspect > buttonAspect) {
                // image is wider than button
                imgWidth = this.width
                imgHeight = this.height * (buttonAspect / imageAspect)
            } else {
                imgWidth = this.width * (imageAspect / buttonAspect)
                imgHeight = this.height
            }
        }

        p.image(
            this.image,
            centerX,
            centerY,
            imgWidth * this.imageScale,
            imgHeight * this.imageScale
        )

        if (this.tint && !this.noTint) {
            p.tint(this.tint)
        } else {
            p.noTint()
        }
        if (this.filter) {
            p.filter(this.filter)
        }
        p.pop()
    }

    this.draw = function () {
        p.push()
        p.fill(this.color)
        p.stroke(this.stroke)
        p.strokeWeight(this.strokeWeight)
        p.rect(this.x, this.y, this.width, this.height, this.cornerRadius)
        p.fill(this.textColor)
        p.noStroke()
        if (this.image) {
            this.drawImage()
        }
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(this.textSize)
        p.textFont(this.textFont)
        p.text(this.text, this.x + this.width / 2, this.y + this.height / 2)

        p.pop()
    }
}
