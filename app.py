from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = 'allklussen040-secret-key-2024'

@app.route('/')
@app.route('/Home')
def home():
    return render_template('home.html')

@app.route('/over-ons')
def over_ons():
    return render_template('over_ons.html')

@app.route('/diensten')
def diensten():
    return render_template('diensten.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        naam = request.form.get('naam', '').strip()
        email = request.form.get('email', '').strip()
        telefoon = request.form.get('telefoon', '').strip()
        bericht = request.form.get('bericht', '').strip()
        flash('Bedankt! We nemen zo snel mogelijk contact met je op.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        gebruikersnaam = request.form.get('gebruikersnaam', '').strip()
        wachtwoord = request.form.get('wachtwoord', '').strip()
        if gebruikersnaam == 'Ali' and wachtwoord == 'alikok99':
            session['user'] = 'Ali'
            flash('Welkom, Ali! Je bent ingelogd.', 'success')
            return redirect(url_for('home'))
        else:
            flash('Ongeldige gebruikersnaam of wachtwoord.', 'error')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('login.html', show_register=True)

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('Je bent uitgelogd.', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True, port=8086)
