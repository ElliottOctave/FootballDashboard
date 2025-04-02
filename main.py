from bokeh.plotting import figure
from bokeh.embed import components
from bokeh.io import curdoc
from bokeh.layouts import layout

# Step 1: Create the figure (this defines `p`)
p = figure(title="Example Player Stats", x_axis_label="Player Index", y_axis_label="Goals")
p.vbar(x=[1, 2, 3, 4, 5], top=[10, 15, 7, 12, 9], width=0.5)

# Step 2: (optional for embedding): Generate HTML parts
script, div = components(p)

# Step 3: Save a static HTML version (optional, for index.html)
with open("index.html", "w", encoding="utf-8") as f:
    f.write(f"""
    <html>
    <head><title>Football Dashboard</title></head>
    <body>
        <h1>Top 5 Players</h1>
        {div}
        {script}
    </body>
    </html>
    """)

# Step 4: Serve the plot via Bokeh server
curdoc().add_root(layout([p]))
