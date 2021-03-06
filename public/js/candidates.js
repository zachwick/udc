/**
 candidates.js the ReactJS components for the Underdog.io Candidate app

 @licstart  The following is the entire license notice for the 
 JavaScript code in this page.
 
 Copyright (C) 2016  zachwick <zach@zachwick.com>
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 @licend  The above is the entire license notice
 for the JavaScript code in this file.
 **/

// This React component is the 'root' of our web app.
// It serves as the container that all other components are composed into.
var CandidateBox = React.createClass({
	// Fetch the Candidate data from the API
	fetchData: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	// This method ensures that our `render` function as defined when we have
	// no data initially upon page load/ReactDOM initiailization
	getInitialState: function() {
		return {data: []};
	},

	// This method is called by React automatically after the component is
	// rendered for the first time.
	componentDidMount: function() {
		this.fetchData();
		setInterval(this.fetchData, this.props.pollInterval);
	},
	
	render: function() {
		// This is React's JSX markup, it's a good thing
		// This is how React does component composing.
		// Note that since this all done via JS, it doesn't matter
		// to this component that the component being composed in here
		// isn't defined until later on in this JS file.
		return (
				<div className="candidateBox">
				<CandidateList data={this.state.data} />
			    </div>
		);
	}
});

// This React component is the list of all Candidates
var CandidateList = React.createClass({
	render: function() {
		if (this.props.data.candidates) {
			var candidateNodes = this.props.data.candidates.map(function(candidate) {
				return (
						<Candidate name={candidate.name.first + " " + candidate.name.last}
					role={candidate.job.position + " at " + candidate.job.company}
					desired_roles={candidate.desired_roles}
					summary={candidate.summary}
					links={candidate.links}
					email={candidate.email}>
						</Candidate>
				);
			});
		}
		return (
				<table className="candidateList">
				<tbody>
				{candidateNodes}
			    </tbody>
			    </table>
		);
	}
});

// This is the React component that refers to a specific Candidate row in the
// table/list of all Candidates
var Candidate = React.createClass({
	render: function() {
		return (
				<tr className="candidate">
				<CandidateName name={this.props.name} role={this.props.role} />
				<CandidateRoleList roles={this.props.desired_roles} />
				<CandidateSummary summary={this.props.summary} />
				<CandidateLinkList links={this.props.links} />
				<CandidateEmail email={this.props.email} />
				</tr>
				
		);
	}
});

// This is the React component that refers to the Candidate's name and title
// column in the table/list of Candidates
var CandidateName = React.createClass({
	render: function() {
		return (
				<td className="candidateName">
				<h2 className="candidateNameName">
				{this.props.name}
			    </h2>
				<p className="candidateNameRole">
				{this.props.role}
			    </p>
				</td>
		);
	}
});

// This is the React component that refers to the Candidate's desired roles
var CandidateRoleList = React.createClass({
	render: function() {
		var roleNodes = this.props.roles.map(function(role) {
			return (
					<CandidateRole role={role} />
			);
		});
		
		return (
				<td className="candidateRoleList">
				<span>Desired Roles</span><br/>
				<p>{roleNodes}</p>
			    </td>
		);
	}
});

// This React component deals with creating a single role in the list of
// a given Candidate's roles.
var CandidateRole = React.createClass({
	render: function() {
		return (
				<div className="candidateRole">
				{this.props.role}
			    </div>
		);
	}
});

// This React component deals with the Candidate's summary
var CandidateSummary = React.createClass({
	render: function() {
		return (
				<td className="candidateSummary">
				<span>In their own words</span><br/>
				<p>{this.props.summary}</p>
				</td>
		);
	}
});

// This React component that constructs the list of a Candidate's links
var CandidateLinkList = React.createClass({
	render: function() {
		// In the data that comes back from the underdog-candidates Candidates API,
		// a given Candidate's links are a JSON object where this key is the name
		// of the site ('github', 'linkedin', 'resume', etc.) and the value is the
		// actual URL. JS Objects don't have a `map` method, so we need to iterate
		// over the object's keys and grab out the value for that key to pass into
		// the CandidateLink component.
		var linkNodes = Object.keys(this.props.links).map(function(key, index, allkeys) {
			return (
					<CandidateLink name={key} link={this.props.links[key]} />
			);
		}, this);

		return (
				<td className="candidateLinkList">
				<span>Links</span><br/>
				<p>{linkNodes}</p>
				</td>
		);
	}
});

// This is the React component that creates a single link in the list of
// a given Candidate's links
var CandidateLink = React.createClass({
	render: function() {
		return (
				<a href={this.props.link}>
				{this.props.name}
			    </a>
		);
	}
});

// This is the React component that manages displaying a given Candidates email
var CandidateEmail = React.createClass({
	render: function() {
		return (
			<td className="candidateEmail">
				<a href={"mailto:" + this.props.email}>
				    Email
			    </a>
			</td>
		);
	}
});

var data = [
{
  "candidates": [
    {
      "desired_roles": [
        "Software Engineer"
      ], 
      "email": "lionel.itchy@dog.book", 
      "job": {
        "company": "Dogbook", 
        "position": "Software Engineer"
      }, 
      "links": {
        "github": "https://github.com/lionel_itchy", 
        "linkedin": "https://linkedin.com/in/lionel_itchy", 
        "resume": "http://underdog-candidates.herokuapp.com/resumes/lionel-itchy"
      }, 
      "name": {
        "first": "Lionel", 
        "last": "Itchy"
      }, 
      "summary": "A contagiously energetic engineer looking to join a small team that's trying to make the world a better."
    }, 
    {
      "desired_roles": [
        "Software Engineer", 
        "Data Scientist"
      ], 
      "email": "will.sniff@gmail.com", 
      "job": {
        "company": "Tumblin in Grass", 
        "position": "Senior Web Developer"
      }, 
      "links": {
        "linkedin": "https://linkedin.com/in/willsniff", 
        "resume": "http://underdog-candidates.herokuapp.com/resumes/will-sniff", 
        "website": "https://will.sniff.io"
      }, 
      "name": {
        "first": "Will", 
        "last": "Sniff"
      }, 
      "summary": "I'm looking for a backend role with the ability to work on data projects. Preferred language is Python but open to anything. Focus on culture is a must."
    }, 
    {
      "desired_roles": [
        "Software Engineer", 
        "Mobile Developer"
      ], 
      "email": "salvador@micropaws.com", 
      "job": {
        "company": "Microsoft Paws", 
        "position": "iOS Developer"
      }, 
      "links": {
        "linkedin": "https://linkedin.com/in/salvador", 
        "resume": "http://underdog-candidates.herokuapp.com/resumes/salvador-doggy"
      }, 
      "name": {
        "first": "Salvador", 
        "last": "Doggy"
      }, 
      "summary": "iOS developer looking to lead a team. I'm more interested in a team of awesome people and a company with a mission than money."
    }
  ]
}];


// This call to ReachDOM.render() must come after the definition of all
// components. This method instantiates the root component our our app
// (`CandidateBox`) and injects the entirety of the HMTL generated from the
// JSX into the DOM element given by the second argument; in our case the
// element with an id of `content`.
ReactDOM.render(
		<CandidateBox url="http://underdog-candidates.herokuapp.com/candidates" pollInterval={2000} />,
	document.getElementById('content')
);
