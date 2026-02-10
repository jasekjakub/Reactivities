using System;
using Application.Activtities.Commands;
using Application.Activtities.DTOs;
using FluentValidation;

namespace Application.Activtities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {
        
    }
}
